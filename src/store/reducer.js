import {CHANGE_INPUT,ADD_ITEM,DELETE_ITEM} from './actionsType'

const  defaultState = {
    inputValue:'write something',
    list:[
        'java',
        'vue',
        'react'
    ]
};

export default (state = defaultState,action)=>{
    //reducer里只能接受state,不能改变state
    if(action.type===CHANGE_INPUT){
        //深度拷贝
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    if(action.type===ADD_ITEM){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }

    if(action.type===DELETE_ITEM){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index,1)
        return newState
    }

    
    return state;
}