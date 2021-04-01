
import {mount} from '../mount'

export function replaceElement(prevNode, nextNode, parent) {
    parent.removeChild(prevNode.el)
    mount(nextNode, parent)
}