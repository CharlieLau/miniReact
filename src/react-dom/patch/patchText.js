

export function patchText(prevNode,nextNode){
    const el = nextNode.el = prevNode.el
    if (prevNode.nodeValue !== nextNode.nodeValue) {
        el.nodeValue = nextNode.nodeValue;
    }
}