import React, {Component } from 'react';
import 'antd/dist/antd.css'
import {Input,Button,List} from 'antd'
import store from './store/index'
import {changeInputAction,addItemAction,deleteItemAction} from './store/actionCreators'




class TodList extends Component{

    constructor(props){
        super(props)
        this.state = store.getState();
        this.changeInputValue.bind(this);
        this.storeChange = this.storeChange.bind(this);
        this.clickBtn=this.clickBtn.bind(this);
        store.subscribe(this.storeChange)
    }


    storeChange(){
        this.setState(store.getState())
    }

    changeInputValue(e){
        const action = changeInputAction(e.target.value)
        store.dispatch(action);
    }

    clickBtn(){
        const action=addItemAction()
        store.dispatch(action);
    }


    deleteItem(index){
        const action=deleteItemAction(index)
        store.dispatch(action);
    }

    render(){
        return(
            <div style={{margin:'10px'}}>
                <div>
                    <Input
                        placeholder={this.state.inputValue}
                        style={{width:'250px',marginRight:'10px'}}
                        onChange={this.changeInputValue}
                        value={this.state.inputValue}
                    />
                    <Button 
                        type="primary"
                        onClick={this.clickBtn}
                    >增加</Button>
                </div>
                <div style={{margin:'10px',width:'300px'}}>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item,index)=>(
                            <List.Item
                             onClick={this.deleteItem.bind(this,index)}
                             >
                            {item}</List.Item>)
                        }
                    />
                </div>
            </div>
        )
    }
}

export default TodList