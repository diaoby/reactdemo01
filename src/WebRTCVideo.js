import React, {createRef} from 'react';
import PropTypes from 'prop-types';

class WebRtcVideo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.videoRef = createRef();
  }

  componentDidMount() {
    this.initVideo()
  }

  componentDidUpdate() {
    this.initVideo();
  }

  initVideo = () => {
    const {streamId} = this.props;
    let {gateway = `${window.location.protocol}//${window.location.host}`} = this.props;
    gateway = gateway.replace(/\/$/, '');

    this.streamId = streamId;
    this.gateway = gateway;

    this.getCodecData();
    this.setupPeerConnection();
  }

  getCodecData = async () => {
    console.debug('getCodecData');
    try {
      const resp = await fetch(`${this.gateway}/codec/${this.streamId}`);
      const data = await resp.json();

      if (data.length > 0) {
        this.peerConnection.addTransceiver('audio', {
          'direction': 'sendrecv'
        })
        this.peerConnection.addTransceiver('video', {
          'direction': 'sendrecv'
        });

        const sendChannel = this.peerConnection.createDataChannel('foo');
        sendChannel.onclose = () => console.log('sendChannel has closed');
        sendChannel.onopen = () => {
          console.debug('sendChannel has opened');
          sendChannel.send('ping');
          setInterval(() => {
            sendChannel.send('ping');
          }, 1000)
        }
        sendChannel.onmessage = e => console.log(`Message from DataChannel '${sendChannel.label}' payload '${e.data}'`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  setupPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    this.peerConnection = peerConnection;

    peerConnection.onconnectionstatechange = (e) => {
      console.debug('ConnectionState', peerConnection.connectionState);
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      console.debug('IceConnectionState', peerConnection.iceConnectionState);
    };

    peerConnection.onicecandidateerror = () => {
      console.info("on ice candidate error");
    };

    peerConnection.ontrack = event => {
      console.debug("ontrack");
      const el = this.videoRef.current;
      el.srcObject = event.streams[0];
      el.muted = true;
      el.autoplay = true;
      el.controls = false;
    };

    peerConnection.onnegotiationneeded = async (event) => {
      console.debug("onnegotiationneeded");
      try {
        const localDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(localDescription);

        const formData = new FormData();
        formData.append('suuid', this.streamId);
        formData.append('data', btoa(peerConnection.localDescription.sdp));
        const response = await fetch(
          `${this.gateway}/recive`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.text();

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription({
            type: "answer",
            sdp: atob(data),
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
  }


  render() {
    return (
      <video
        width={400}
        height={300}
        muted
        autoPlay
        controls={true}
        ref={this.videoRef}
      />
    );
  }
}

WebRtcVideo.propTypes = {
  streamId: PropTypes.string.isRequired,
  gateway: PropTypes.string,
};

export default WebRtcVideo;