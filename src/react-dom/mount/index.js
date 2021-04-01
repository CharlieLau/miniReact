
import { Component } from "../../react/component"
import { patchAttrs } from "../patch/attrs"
import {renderComponent} from '../render'

export function mount(vnode, parent, refNode) {
    if (vnode.tag === 'TEXT') {
        mountText(vnode, parent)
    } else if (typeof vnode.tag === 'function') {
        const instance = createComponent(vnode)
        setComponentProps(instance, vnode.attrs);
        renderComponent(instance, parent, refNode);
    } else {
        mountElement(vnode, parent, refNode)
    }
}

function mountText(vnode, parent) {
    const el = document.createTextNode(vnode.nodeValue)
    vnode.el = el
    parent.appendChild(el)
}

function mountElement(vnode, parent, refNode) {
    const { tag, children, attrs } = vnode
    const el = document.createElement(tag)
    vnode.el = el
    if (Array.isArray(children) && children.length) {
        children.forEach(vnode => mount(vnode, el))
    } else {
        console.log('unhandled children  type', children)
    }

    if (attrs) {
        Object.keys(attrs).forEach(key => patchAttrs(el, key, {}, attrs[key]))
    }
    refNode ? parent.insertBefore(el, refNode) : parent.appendChild(el)
}

function createComponent(vnode) {
    let instance

    if (vnode.tag.prototype && vnode.tag.prototype.render) {
        instance = new vnode.tag(vnode.attrs)
    } else {
        instance = new Component(vnode.attrs)
        instance.constructor = vnode.tag
        instance.render = function () {
            return this.constructor(vnode.attrs)
        }
    }
    vnode.component = instance
    return instance
}

function setComponentProps(component, props) {

    if (component.componentWillMount) {
        component.componentWillMount()
    }
    component.props = props;
}
