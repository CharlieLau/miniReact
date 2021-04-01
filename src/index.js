
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

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
    }
    handleClick(){
        this.setState({count: this.state.count+1})
    }
    render(){
        return <div>
            Welcome to  use  mini React~
            <h1>time is : <label>{new Date().toLocaleTimeString()}</label></h1>
            {this.state.count.toString()}
            <button onClick={this.handleClick.bind(this)}>+ 1</button>
        </div>
    }
}


render(<App/>,document.getElementById('app'))