import { mount } from './mount'
import { patch } from './patch'

export function render(vnode, node) {
    if (!node._vnode) {
        mount(vnode, node)
    } else {
        patch(node._vnode, vnode, node)
    }
    if (typeof vnode.tag !== 'function') {
        node._vnode = vnode
    }
}

export function renderComponent(component, node) {
    const renderer = component.render()
    if (!component.base) {
        mount(renderer, node)
        if (component.componentDidMount) {
            component.componentDidMount()
        }
    } else {
        if (component.componentWillUpdate) {
            component.componentWillUpdate()
        }
        let prevNode = component._vnode
        let nextNode = renderer
        patch(prevNode, nextNode, node)
        if (component.componentDidUpdate) {
            component.componentDidUpdate()
        }
    }
    component.base = node
    node._component = component
    node._vnode = renderer
    component._vnode = renderer
}