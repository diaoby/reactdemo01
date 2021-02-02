import React from 'react';


function Welcome(props){
    return (
        <div><h1 className='foo'>{props.name}</h1> 
           <h1 style={{
                width: "100%", 
                height: "50px", 
                backgroundColor: "blue", 
                fontSize: "20px"
            }}
            > Hello, {props.name} 
        </h1>
        </div>
        );
}

export default Welcome