import { replaceElement } from "./replaceElement"
import { patchElement } from './patchElement'
import { patchText } from './patchText'
import { patchComponent } from './patchComponent'

export function patch(prevNode, nextVnode, parent) {
    if (prevNode.tag !== nextVnode.tag) {
        replaceElement(prevNode, nextVnode, parent)
    } else if (typeof nextVnode.tag === 'function') {
        patchComponent(prevNode, nextVnode)
    } else if (nextVnode.tag !== 'TEXT') {
        patchElement(prevNode, nextVnode, parent)
    } else {
        patchText(prevNode, nextVnode)
    }
}