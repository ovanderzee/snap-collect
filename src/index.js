import { getMainMethods } from './maintenance'
import { yieldingMethods } from './yielding'

/**
 * Contruct a SnapCollect object.
 * The identifier is passed form the main function.
 * @private
 * @param {String} identifier
 * @return {Object} the prototype
 */
const init = function SnapCollect(identifier) {
    // determine key to store the held objects
    const accept = Boolean(identifier)
    const errMsg = 'snapCollect: identifier must evaluate to true'
    if (!accept) throw errMsg

    // build methods object
    const methods = getMainMethods(identifier)
    Object.assign(methods, yieldingMethods)

    // set characteristic SnapCollect properties
    methods.identifier = identifier
    methods.name = 'SnapCollect'

    return methods
}

/**
 * Create a new empty SnapCollect object.
 * The identifier is the unique key used to identify the objects.
 * @param {String} identifier
 * @return {SnapCollect}
 */
const snapCollect = function (identifier) {
    const methods = init(identifier)
    return Object.create(methods)
}

export default snapCollect
