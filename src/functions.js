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
 * Set characteristic SnapCollect properties
 * @private
 * @param {Object} collection - the instance
 * @param {String} identifier - instance specific property
 */
const addSnapCollectProperties = function (collection, identifier) {
    Object.defineProperties(collection, {
        identifier: {
            value: identifier,
        },
        name: {
            value: 'SnapCollect',
        },
    })
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
    addSnapCollectProperties(foreignCollection, this.identifier)
    foreignCollection.add(...foreignArray)
    return foreignCollection
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

    for (let value of values) {
        let satisfing = true
        conditionsEntries.forEach((condition) => {
            satisfing =
                satisfing &&
                JSON.stringify(value[condition[0]]) ===
                    JSON.stringify(condition[1])
        })
        if (satisfing === isAction) this.delete(value[this.identifier])
    }
}

export {
    keying,
    addSnapCollectProperties,
    arrayToSnapCollect,
    conditionalDeleting,
}
