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

/**
 * Get identifier from initialised SnapCollect object,
 * @private
 * @param {SnapCollect} collection - initialised SnapCollect object
 * @return {String} identifier
 */
const getIdentifier = function (collection) {
    return Object.getPrototypeOf(collection).identifier
}

/**
 * Act on data satisfing all conditions,
 * using a JSON.stringify comparison.
 * @private
 * @param {Object} conditions - one or more conditions
 * @param {Boolean} isAction - act on true or act on false
 */
const conditionalDeleting = function (conditions, isAction) {
    const conditionsEntries = Object.entries(conditions)
    const values = Object.values(this)
    const identifier = getIdentifier(this)
    for (let value of values) {
        let satisfing = true
        conditionsEntries.forEach((condition) => {
            satisfing =
                satisfing &&
                JSON.stringify(value[condition[0]]) ===
                    JSON.stringify(condition[1])
        })
        if (satisfing === isAction) this.delete(value[identifier])
    }
}

export { keying, arrayToSnapCollect, conditionalDeleting }
