import { addSnapCollectProperties } from './functions'
import { coreMethods } from './core'
import { maintenanceMethods } from './maintenance'
import { yieldingMethods } from './yielding'

/**
 * Construct a SnapCollect object.
 * @private
 * @param {String} identifier
 * @return {Object} the prototype
 */
const init = function SnapCollect(identifier) {
    // determine key to store the held objects
    const accept = Boolean(identifier)
    const errMsg = 'snapCollect: identifier must evaluate to true'
    if (!accept) throw errMsg

    // append coreMethods object
    Object.assign(coreMethods, maintenanceMethods, yieldingMethods)

    return coreMethods
}

/**
 * Create a new empty SnapCollect object.
 * @param {String} identifier - unique key identifing the objects.
 * @return {SnapCollect}
 */
const snapCollect = function (identifier) {
    const methods = init(identifier)
    const collection = Object.create(methods)
    addSnapCollectProperties(collection, identifier)
    return collection
}

export default snapCollect
