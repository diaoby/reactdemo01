import React, {Component} from 'react';
 
class PistItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            vote : 0 
        }
    }

    handleClick() { 
        let vote = this.state.vote; 
        vote++; 
        this.setState({ vote: vote }); 
    }

    render() { 
        return ( 
            <div>
               <div> {this.props.title} </div> 
               <div> 创建人：<span>{this.props.author}</span> </div> 
               <div> 创建时间：<span>{this.props.date}</span> </div>
               {/* <button onClick={this.handleClick.bind(this)}> */}
               <button  
                onClick={
                    ()=>{this.handleClick();
                }}
               >
                   点赞
                </button>
                <div><span>{this.state.vote}</span></div>
            </div>
        );
    }
}
 
export default PistItem;