import React, {Component } from 'react';

class Process extends Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {  }
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }


    render() { 
        console.log('render');
        return ( <div>Process</div> );
    }
}
 
export default Process;