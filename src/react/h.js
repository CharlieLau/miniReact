
export function h(type, attrs, ...children) {
    let tag = type
    let flag = 'NO_CHILD'

    if (children.length === 1) {
        flag = 'SINGLE_CHILD'
    } else if (children.length > 0) {
        flag = 'MULTI_CHILD'
    } else if (typeof type ==='function'){
        flag =''
    }

    children = children.filter(item => item).map((item, index) => {
        if (typeof item === 'string' || typeof item === 'number') {
            return {
                tag: 'TEXT',
                key: index,
                nodeValue: item.toString()
            }
        }
        return {
            ...item,
            key: item.key || index
        }
    })
    return {
        tag,
        flag,
        attrs,
        children
    }
}