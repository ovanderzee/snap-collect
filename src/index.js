import { arrayIntersection, arrayCombination } from 'my-lib'

/**
 * Convert an array in object with our type of keys
 * @private
 * @param {Object[]} foreignArray - to convert
 * @return {Object} keyed object
 */
const arrayToPseudoObject = function (foreignArray, identifier) {
    const foreignObject = Object.create({ keyIdentifier: identifier })
    foreignArray.forEach((data) => {
        foreignObject[data[identifier].toString()] = data
    })
    return foreignObject
}

/**
 * Find our type of keys in an array or in a snapCollect
 * @private
 * @param {Object} foreignObject of our (pseudo) type - to relate with
 * @return {Object[]}
 */
const getForeignKeys = function (foreignItem) {
    if (foreignItem.keyIdentifier) {
        return Object.keys(foreignItem)
    }
}

const snapCollect = function (identifier) {
    const methods = {
        keyIdentifier: identifier,

        // maintenance functions

        add: function (data) {
            const key = data[identifier]
            this.set(key, data)
        },
        delete: function (key) {
            delete this[key.toString()]
        },
        get: function (key) {
            return this[key.toString()]
        },
        has: function (key) {
            return Object.prototype.hasOwnProperty.call(this, key.toString())
        },
        get length() {
            return Object.keys(this).length
        },
        set: function (key, data) {
            this[key.toString()] = data
        },
        toggle: function (data) {
            const key = data[identifier]
            if (this.has(key)) {
                this.delete(key)
            } else {
                this.set(key, data)
            }
        },

        // return arrays

        entries: function () {
            return Object.entries(this)
        },
        keys: function () {
            return Object.keys(this)
        },
        values: function () {
            return Object.values(this)
        },

        /**
         * Find all records from both arrays by identifier,
         * with deduplication
         * @param {Object[] || snapCollect} foreignItem
         * @return {Object[]} common values, deduplicated
         */
        combination: function (foreignItem) {
            if (Array.isArray(foreignItem)) {
                foreignItem = arrayToPseudoObject(foreignItem, identifier)
            }
            const foreignKeys = getForeignKeys(foreignItem)
            if (!foreignKeys) return
            const commonKeys = arrayCombination(this.keys(), foreignKeys)
            const commons = commonKeys.map((common) => {
                const fromHere = this.get(common.toString())
                const fromAbroad = foreignItem[common]
                return fromHere || fromAbroad
            })
            return commons
        },

        /**
         * Find records appearing in both own collection and in foreign array
         * by comparing their identifier,
         * with deduplication
         * @param {Object[] || snapCollect} foreignItem
         * @return {Object[]} mutual values, deduplicated
         */
        intersection: function (foreignItem) {
            if (Array.isArray(foreignItem)) {
                foreignItem = arrayToPseudoObject(foreignItem, identifier)
            }
            const foreignKeys = getForeignKeys(foreignItem)
            if (!foreignKeys) return
            const mutualKeys = arrayIntersection(this.keys(), foreignKeys)
            const mutuals = mutualKeys.map((mutual) =>
                this.get(mutual.toString()),
            )
            return mutuals
        },

        // TODO:
        //   except/excepting
    }
    return Object.create(methods)
}
// plain snap subsets  simple-subset
export default snapCollect
