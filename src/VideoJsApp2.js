import React, {Component} from 'react';
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'



class VideoJsApp extends Component{

  constructor(props){
    super(props)
    this.state ={
      nowPlay:"",
      url:props.url,
      id:props.id
    }
  }



  componentDidMount(){
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: this.state.url,
        type: 'rtmp/flv'
      }]
    }


   this.player = videojs( this.state.id, videoJsOptions , function onPlayerReady() { //(id或者refs获取节点，options，回调函数)
      videojs.log('Your player is ready!');
      // In this context, `this` is the player that was created by Video.js.
      this.play();
      // How about an event listener?
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
      });
    }); 

}


  componentWillUnmount(){
  }

  render(){
  return(
      <div>
          <div>
            <video style={{width:"350px",height:"250px",margin:"0 auto"}} id={ this.state.id} className="video-js vjs-default-skin">
            </video>
          </div>
      </div>   
  )
  }
}

export default VideoJsApp;