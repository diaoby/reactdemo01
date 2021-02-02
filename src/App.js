import React, {Component} from 'react';
import PostList1 from './PostList1'
import Welcome from './Welcome';
import Process from './Process';
import TodList from './TodoList'



const element = <h1>Hello, world!</h1>;

const todos = ['java','c++','reactjs'];

class App extends Component{

  constructor(props){
    super(props)
    this.state ={
      streamId: "demo1"
    }
  }



  componentDidMount(){
  }


  componentWillUnmount(){
  }

  render(){
    
  return(
      <div>
        {/* {element} */}
        {/* <ul>
          {
            todos.map( (item,index) => 
              <li key={index} onClick={(value)=>{
                  console.log(value.target)}
                }>
                {item=='java'?'java+':item}
              </li>
            )
          } 
          </ul> */}
           {/* <PostList1></PostList1>
          <Welcome name='diaoby'></Welcome>
          <Process></Process> */}
          <TodList></TodList>
      </div>   
  )
  }
}

export default App;