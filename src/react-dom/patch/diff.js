import { mount } from "../mount/index.js";
import { patch } from "../patch/index.js";

export function reactDiff(prevChildren, nextChildren, parent) {
    const prevIndexMap = new Map()
    const nextIndexMap = new Map()


    for (let i = 0; i < prevChildren.length; i++) {
        prevIndexMap.set(prevChildren[i].key, i)
    }
    let lastIndex = 0;

    for (let i = 0; i < nextChildren.length; i++) {
        let nextChild = nextChildren[i];
        let nextKey = nextChild.key;
        nextIndexMap.set(nextKey, i)

        let  j = prevIndexMap.get(nextKey)

        // 在新列表中有全新的VNode节点，在旧列表中找不到。遇到这种情况，我们需要根据新的VNode节点生成DOM节点，并插入DOM树中。
        if (j == undefined) {
            let refNode = i === 0 ? prevChildren[0].length : nextChildren[i - 1].el.nextSibling;
            mount(nextChild, parent, refNode)
        } else {

            patch(prevChildren[j], nextChild, parent )

            if (j < lastIndex) {
                // 需要移动节点
                let refNode = nextChildren[i - 1].el.nextSibling;
                parent.insertBefore(nextChild.el, refNode)
            } else {
                // 不需要移动节点，记录当前位置，与之后的节点进行对比
                lastIndex = j
            }
        }
    }
    // 当旧的节点不在新列表中时，我们就将其对应的 DOM 节点移除
    for (let i = 0; i < prevChildren.length; i++) {
        let { key } = prevChildren[i]
        if (!nextIndexMap.has(key)) parent.removeChild(prevChildren[i].el)
    }
}