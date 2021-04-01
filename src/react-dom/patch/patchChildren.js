import { patch } from ".";
import { mount } from "../mount";
import { reactDiff } from "./diff";


export function patchChildren(prefxChildFlag,prevChildren,nextChildFlag,nextChildren,parent){
    switch(prefxChildFlag){
        case 'SINGLE_CHILD':
            switch(nextChildFlag){
                 case 'NO_CHILD':
                    parent.remove(prevChildren[0])
                    break
                case 'SINGLE_CHILD':
                    patch(prevChildren[0],nextChildren[0],parent)
                    break;
                default:
                    parent.removeChild(prevChildren[0])
                    nextChildren.forEach(vnode=>mount(vnode,parent))
            }
            break;
        case 'NO_CHILD':
            switch(nextChildFlag){
                case 'SINGLE_CHILD':
                    mount(nextChildren[0],parent)
                    break
                case 'NO_CHILD':
                    break
                default:
                    nextChildren.forEach(vnode=>mount(vnode,parent))
                    break
            }
            break;
        default:
            switch (nextChildFlag) {
                // 如果新没节点
                case 'NO_CHILD':
                    prevChildren.forEach(vnode => parent.removeChild(vnode.el))
                    break;
                // 如果新 只有一个
                case 'SINGLE_CHILD':
                    prevChildren.forEach(vnode => parent.removeChild(vnode.el))
                    mount(nextChildren[0], parent)
                    break;
                // 如果新 多个
                default:
                    reactDiff(prevChildren, nextChildren, parent)
                    break;
            }
            break;

    }
}