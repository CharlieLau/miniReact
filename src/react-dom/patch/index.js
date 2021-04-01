import { replaceElement } from "./replaceElement"
import { patchElement } from './patchElement'
import { patchText } from './patchText'

export function patch(prevNode, nextVnode, parent) {
    if (prevNode.tag !== nextVnode.tag) {
        replaceElement(prevNode, nextVnode, parent)
    } else if (nextVnode.tag !== 'TEXT') {
        patchElement(prevNode, nextVnode, parent)
    } else {
        patchText(prevNode, nextVnode)
    }
}