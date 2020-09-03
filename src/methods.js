import { arrayToPseudoObject, getForeignKeys } from './functions'
import { arrayIntersection, arrayCombination } from 'my-lib'

const getMethods = function (identifier) {
    const methods = {
        // maintenance functions

        /**
         * Place (or replace) one or more record,
         * get the key for the record from the field specified by the identifier.
         * @param {Arguments} anonymus - one or more records
         */
        add: function () {
            const dataList = Array.from(arguments)
            dataList.forEach((data) => this.set(data[identifier], data))
        },
        /**
         * Delete the data kept with a key, and the key itself.
         * @param {String} key
         */
        delete: function (key) {
            delete this[key.toString()]
        },
        /**
         * Get the data kept with a key.
         * @param {String} key
         * @return {Object} the data
         */
        get: function (key) {
            return this[key.toString()]
        },
        /**
         * Examine the existance of a key.
         * @param {String} key
         * @return {Boolean}
         */
        has: function (key) {
            return Object.prototype.hasOwnProperty.call(this, key.toString())
        },
        /**
         * Count the number of records kept.
         * @return {Number}
         */
        get length() {
            return Object.keys(this).length
        },
        /**
         * Place (or replace) a record under a certain key.
         * @param {String} key
         * @param {Object} data
         */
        set: function (key, data) {
            this[key.toString()] = data
        },
        /**
         * Place an unkown record or remove a known record.
         * @param {Object} data
         */
        toggle: function (data) {
            const key = data[identifier]
            if (this.has(key)) {
                this.delete(key)
            } else {
                this.set(key, data)
            }
        },

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
         * @return {String[]} entries
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
         * Find all records from both arrays by identifier,
         * with deduplication.
         * @param {Object[] || snapCollect} foreignItem
         * @return {Object[]} common values, deduplicated
         */
        combination: function (foreignItem) {
            if (Array.isArray(foreignItem)) {
                foreignItem = arrayToPseudoObject.call(this, foreignItem)
            }
            const foreignKeys = getForeignKeys.call(this, foreignItem)
            if (!foreignKeys) return
            const commonKeys = arrayCombination(this.keys(), foreignKeys)
            const commons = commonKeys.map((common) => {
                const domestic = this.get(common.toString())
                const foreign = foreignItem[common]
                return domestic || foreign
            })
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
                foreignItem = arrayToPseudoObject.call(this, foreignItem)
            }
            const foreignKeys = getForeignKeys.call(this, foreignItem)
            if (!foreignKeys) return
            const mutualKeys = arrayIntersection(this.keys(), foreignKeys)
            const mutuals = mutualKeys.map((mutual) =>
                this.get(mutual.toString()),
            )
            return mutuals
        },
    }

    return methods
}

export { getMethods }
