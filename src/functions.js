/**
 * Convert an array to a likewise initialised SnapCollect object
 * @private
 * @this {SnapCollect}
 * @param {Object[]} foreignArray - to convert
 * @return {Object} keyed object
 */
const arrayToSnapCollect = function (foreignArray) {
    const foreignCollection = Object.create(Object.getPrototypeOf(this))
    foreignCollection.add(...foreignArray)
    return foreignCollection
}

export { arrayToSnapCollect }
