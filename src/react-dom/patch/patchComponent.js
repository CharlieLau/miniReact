import { setComponentProps } from "./attrs"

export function patchComponent(prevNode, nextNode) {

    if (prevNode.tag === nextNode.tag) {
        setComponentProps(prevNode.instance, nextNode.attrs,prevNode.instance.base)
        nextNode.instance = prevNode.instance
    }
}