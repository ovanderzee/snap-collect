const keying = {
    /**
     * Check value applicable as key
     * @private
     * @param {Any} value
     * @return {Boolean} useablity
     */
    test: function (value) {
        return value && value.toString
    },

    /**
     * Compose a key
     * @private
     * @param {Any} value - to convert
     * @return {String} useable key
     */
    make: function (value) {
        return value.toString()
    },
}

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

export { keying, arrayToSnapCollect }
