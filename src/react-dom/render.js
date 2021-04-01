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


export function renderComponent(component, node, refNode) {
    const renderer = component.render()
    if (!component.base) {
        mount(renderer, node, refNode)
    } else {
        patch(node._vnode, renderer, parent)
    }
    
    component.base = node
    node._component = component

    node._vnode = renderer
}