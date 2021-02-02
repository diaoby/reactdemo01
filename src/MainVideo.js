import React, {Component} from 'react';
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import "./MainVideo.css";

class MainVideo extends Component{
  componentDidMount() {
      this.player = videojs(this.videoNode, {
          autoplay: false,
          controls: false,
          sources: [{
              src: "myFancyVideo.mp4",
              type: 'video/mp4'
          }]
      });
  }
  render() {
      return (
          <div className="fullscreen" div-vjs-player> 
                  <video ref={node => this.videoNode = node} className="video-js"></video>          
          </div>

      );
  }
}

export default MainVideo;