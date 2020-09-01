import { getMethods } from './methods'

const init = function SnapCollect(identifier) {
    // determine key to store the held objects
    const accept = Boolean(identifier)
    const errMsg = 'snapCollect: identifier must evaluate to true'
    if (!accept) throw errMsg

    // set characteristic SnapCollect properties
    const methods = getMethods(identifier)
    methods.identifier = identifier
    methods.name = 'SnapCollect'

    return methods
}

const snapCollect = function (identifier) {
    const methods = init(identifier)
    return Object.create(methods)
}

export default snapCollect
