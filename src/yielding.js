import { arrayToSnapCollect } from './functions'
import { arrayIntersection, arrayCombination, isUsableNumber } from 'my-lib'

const yieldingMethods = {
    // yielding arrays

    /**
     * Return all kept records in a two dimensional Array,
     * using the native Object.entries.
     * @return {Array} entries
     */
    entries: function () {
        return Object.entries(this)
    },
    /**
     * Return the keys of all kept records,
     * using the native Object.keys.
     * @return {String[]} keys
     */
    keys: function () {
        return Object.keys(this)
    },
    /**
     * Return the values of all kept records,
     * using the native Object.values.
     * @return {Object[]} values
     */
    values: function () {
        return Object.values(this)
    },

    /**
     * Return ascending sorted values of all kept records,
     * @param {Arguments} anonymus - one or more property names to sort on
     * @return {Object[]} sorted records
     */
    sort: function () {
        const sorted = Object.values(this)
        const badVariables = [undefined, null]
        for (let i = arguments.length - 1; i > -1; i--) {
            const prop = arguments[i]
            sorted.sort(function (a, b) {
                if (isUsableNumber(a[prop], b[prop])) {
                    return a[prop] - b[prop]
                }
                if (badVariables.includes(a[prop])) {
                    return sorted.length
                }
                if (badVariables.includes(b[prop])) {
                    return 0 - sorted.length
                }
                if (a[prop].toString && b[prop].toString) {
                    let valueA = a[prop].toString()
                    let valueB = b[prop].toString()
                    return valueA.localeCompare(valueB)
                }

                return
            })
        }
        return sorted
    },

    /**
     * Find records satisfing all conditions,
     * using a JSON.stringify comparison.
     * @param {Object} conditions - one or more conditions
     * @return {Object[]} subset of records
     */
    where: function (conditions) {
        let subset = Object.values(this)
        const compareKeys = Object.keys(conditions)
        compareKeys.forEach((key) => {
            subset = subset.filter(
                (subsetItem) =>
                    JSON.stringify(subsetItem[key]) ===
                    JSON.stringify(conditions[key]),
            )
        })
        return subset
    },

    /**
     * Find all records from both arrays by identifier,
     * with deduplication.
     * @param {Object[] || snapCollect} foreignItem
     * @return {Object[]} common values, deduplicated
     */
    combination: function (foreignItem) {
        if (Array.isArray(foreignItem)) {
            foreignItem = arrayToSnapCollect.call(this, foreignItem)
        }
        const commonKeys = arrayCombination(this.keys(), foreignItem.keys())
        const commons = commonKeys.map(
            (key) => this.get(key) || foreignItem.get(key),
        )
        return commons
    },

    /**
     * Find records appearing in both own collection and in foreign array,
     * by comparing their identifier,
     * with deduplication.
     * @param {Object[] || snapCollect} foreignItem
     * @return {Object[]} mutual values, deduplicated
     */
    intersection: function (foreignItem) {
        if (Array.isArray(foreignItem)) {
            foreignItem = arrayToSnapCollect.call(this, foreignItem)
        }
        const mutualKeys = arrayIntersection(this.keys(), foreignItem.keys())
        const mutuals = mutualKeys.map((key) => this.get(key))
        return mutuals
    },
}

export { yieldingMethods }
