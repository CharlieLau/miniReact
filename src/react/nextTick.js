import {  renderComponent } from "../react-dom/render"

//  状态更新队列
const stateQueue=[]
//  渲染队列
const renderQueue=[] 
const nextTicks=[]

const  defer = fn => typeof Promise !=='undefined' ? Promise.resolve().then(fn):setTimeout(fn,0)

export function enQueueState  (state,component,nextTick){
    if(stateQueue.length === 0){
        defer(flush).then(()=>{
           nextTicks.forEach(fn=> fn())
           nextTicks.length = 0
        })
    }

    stateQueue.push({
        nextState:state,
        component
    })

    if(nextTick && !nextTicks.includes(nextTick)){
        nextTicks.push(nextTick)
    }

    if (!renderQueue.find( item => item === component ) ) {
        renderQueue.push( component );
    }
}


function flush(){
    let item
    while( item = stateQueue.shift()){
        const {nextState,component} = item
        if(!component.prevState){
            component.prevState = Object.assign({},component.state)
        }
        // 如果nextState是函数
        if(typeof nextState ==='function'){
            Object.assign(component.state,nextState(component.prevState,component.props))
        }else {
            Object.assign(component.state ,nextState)
        }
        component.prevState = component.state
    }

    while(item= renderQueue.shift()){
        renderComponent(item,item.base)
    }
}