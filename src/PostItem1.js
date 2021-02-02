import React from 'react'
import PropTypes from 'prop-types';
import "./PostItem.css";

function PostItem1(props){
    //解构
    const{title,author,date,vote,id} = props.post;
    const{onVote} = props

    return (
         <li className='item'>
            <div className='title'> {title} </div>
            <div> 创建人：<span>{author}</span> </div> 
            <div> 创建时间：<span>{date}</span> </div> 
            <div className='like'> 
                <button 
                   onClick={() => onVote(id)}
                >点赞
                </button> <span>{vote}</span>
            </div>
        </li> 
    );
}

PostItem1.prototype ={
    post:PropTypes.object,
    onVote:PropTypes.func
}




export default PostItem1;