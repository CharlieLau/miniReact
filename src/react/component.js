import { renderComponent } from '../react-dom/render'

export class Component {
    constructor(props) {
        this.props = props
        this.state = {}
        this.isReactComponent = true
    }
    render() {
        throw new Error('should override')
    }
    setState(partState) {
        Object.assign(this.state, partState)
        renderComponent(this, this.base)
    }
}