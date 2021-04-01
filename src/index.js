
import {h,Component} from './react'
import { render} from './react-dom'

// function tick(){
//     render(<div style={{color:'red'}}>
//         hello, now is: 
//                 <h1 style={{display:'inline-block',marginLeft:'10px'}}>
//                     {new Date().toLocaleTimeString()}
//                 </h1>
//         </div>,
//         document.getElementById('app'))
// }


// tick()

// setInterval(()=>{
//     tick()
// },1000)

// function App() {
//     return <div>Welcome to  use  mini React~</div>
// }

class Welcome  extends Component{

    constructor(props){
        super(props)
        this.state={count:0}
    }


    render(){
        return <p>Hi  <strong style={{color:'red'}}> {this.props.userName}</strong>,Welcome to use  mini React~ <button onClick={this.handleClick.bind(this)}>{this.state.count.toString()}</button></p>
    }

    handleClick(){
        this.setState({
            count:this.state.count+1
        })
    }

    componentWillMount(){
        console.log('componentWillMount')
    }
    componentWillReceiveProps(props){
        console.log('componentWillReceiveProps',props)
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
    }
    componentDidUpdate(){
        
        console.log('componentDidUpdate',this.key)
    }

    componentDidMount(){
        console.log('componentDidMount')
    }
}


class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            userName:'charlie'
        }
    }

    // componentWillUnmount(){
    //     console.log('componentWillUnmount')
    // }
    
    handleClick(){
        // this.setState({count: this.state.count+1})
        this.setState({userName:'Charlie Lau',count:this.state.count+1})
    }
    render(){
        return <div>
            Welcome to  use  mini React~
            <Welcome userName={this.state.userName}></Welcome>
            <Welcome userName={this.state.userName}></Welcome>
            <h1>time is : <label>{new Date().toLocaleTimeString()}</label></h1>
            {this.state.count.toString()}
            <button onClick={this.handleClick.bind(this)}>+ 1</button>
        </div>
    }
}


render(<App/>,document.getElementById('app'))