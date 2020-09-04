/**
 * Convert an array to a pseudo SnapCollect object
 * @private
 * @this {SnapCollect}
 * @param {Object[]} foreignArray - to convert
 * @return {Object} keyed object
 */
const arrayToPseudoObject = function (foreignArray) {
    const pseudoObject = Object.create({ identifier: this.identifier })
    foreignArray.forEach((data) => {
        pseudoObject[data[this.identifier].toString()] = data
    })
    return pseudoObject
}

/**
 * Find our type of keys in a pseudoObject
 * @private
 * @param {SnapCollect} foreignCollection (pseudo) SnapCollect - to relate with
 * @return {Object[]}
 */
const getForeignKeys = function (foreignCollection) {
    return Object.keys(foreignCollection)
}

export { arrayToPseudoObject, getForeignKeys }
