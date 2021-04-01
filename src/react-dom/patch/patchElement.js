
import { patchAttrs } from './attrs'
import { patchChildren } from './patchChildren'
import { replaceElement } from './replaceElement'

export function patchElement(prevNode, nextNode, parent) {

    if (prevNode.tag !== nextNode.tag) {
        return replaceElement(prevNode, nextNode, parent)
    }


    const el = nextNode.el = prevNode.el
    const { attrs: prevData } = prevNode
    const { attrs: nextData } = nextNode


    // 新增或者替换老属性
    nextData && Object.keys(nextData).forEach(key => {
        const prevValue = prevData[key];
        const nextValue = nextData[key];
        patchAttrs(el, key, prevValue, nextValue)
    })


     // 删除新不存在的老属性
    prevData && Object.keys(prevData).forEach(key => {
        if (!nextData.hasOwnProperty(key)) {
            patchAttrs(el, key, prevData[key], null)
        }
    })


    patchChildren(prevNode.flag,prevNode.children, nextNode.flag, nextNode.children,parent)
}