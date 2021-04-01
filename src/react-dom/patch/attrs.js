import {renderComponent} from '../render'
const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/

export function patchAttrs(el, key, prevValue, nextValue) {
    switch (key) {
        case 'style':
            for (let k in nextValue) {
                el.style[k] = nextValue[k]
            }
            for (let k in prevValue) {
                if (!nextValue.hasOwnProperty(k)) {
                    el.style[k] = ''
                }
            }
            break
        case 'class':
            nextValue ? el.className = nextValue : el.classList.remove(...el.classList)
            break
        default:
            if (key.startsWith('on')) {
                if (prevValue) {
                    el.removeEventListener(key.slice(2).toLocaleLowerCase(), prevValue)
                }
                if (nextValue) {
                    el.addEventListener(key.slice(2).toLocaleLowerCase(), nextValue)
                }
            } else if (domPropsRE.test(key)) {
                el[key] = nextValue
            } else {
                el.setAttribute(key, nextValue)
            }
            break;
    }
}

export function setComponentProps(component,props,parent) {
        
    if (!component.base) {
        if (component.componentWillMount) {
            component.componentWillMount()
        }
    } else {
        if (component.componentWillReceiveProps) {
            component.componentWillReceiveProps(props)
        }
    }


    component.props = props;
    renderComponent(component,parent)

}
