import { renderComponent } from '../react-dom/render'
import {enQueueState} from './nextTick'

export class Component {
    constructor(props) {
        this.props = props
        this.state = {}
        this.isReactComponent = true
    }
    render() {
        throw new Error('should override')
    }
    setState(partState,fn) {
        // Object.assign(this.state, partState)
        // renderComponent(this, this.base)
        enQueueState(partState,this,fn)
    }
}