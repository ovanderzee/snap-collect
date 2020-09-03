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
 * @this {SnapCollect}
 * @param {Object || Object[]} foreignItem array or (pseudo) SnapCollect - to relate with
 * @return {Object[]}
 */
const getForeignKeys = function (foreignItem) {
    return Object.keys(foreignItem)
}

export { arrayToPseudoObject, getForeignKeys }
