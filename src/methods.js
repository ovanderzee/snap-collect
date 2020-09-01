import { arrayToPseudoObject, getForeignKeys } from './functions'
import { arrayIntersection, arrayCombination } from 'my-lib'

const getMethods = function (identifier) {
    const methods = {
        // maintenance functions

        add: function () {
            const dataList = Array.from(arguments)
            dataList.forEach((data) => this.set(data[identifier], data))
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

        // yielding arrays

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
         * Find records appearing in both own collection and in foreign array
         * by comparing their identifier,
         * with deduplication
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

        // TODO:
        //   except/excepting
    }

    return methods
}

export { getMethods }
