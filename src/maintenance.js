import { conditionalDeleting, arrayToSnapCollect } from './functions'

const getMainMethods = function (identifier) {
    const methods = {
        // maintenance functions

        /**
         * Place (or replace) one or more record,
         * get the key for the record from the field specified by the identifier.
         * @param {Arguments} anonymus - one or more records
         * @return {Object[]} all current data
         */
        add: function () {
            const dataList = Array.from(arguments)
            dataList.forEach((data) => this.set(data[identifier], data))
            return Object.values(this)
        },
        /**
         * Delete all data and return to initial state.
         */
        clear: function () {
            const keys = Object.keys(this)
            for (let key of keys) {
                this.delete(key)
            }
        },
        /**
         * Confine collection to intersection with array.
         * @param {Object[] || SnapCollect} foreignItem - other similar data
         * @return {Object[]} all current data
         */
        cross: function (foreignItem) {
            if (Array.isArray(foreignItem)) {
                foreignItem = arrayToSnapCollect.call(this, foreignItem)
            }
            const foreignKeys = foreignItem.keys()
            const keys = Object.keys(this)
            for (let key of keys) {
                if (!foreignKeys.includes(key)) {
                    this.delete(key)
                }
            }
            return Object.values(this)
        },
        /**
         * Delete data satisfing all conditions,
         * using a JSON.stringify comparison.
         * @param {Object} conditions - one or more conditions
         * @return {Object[]} all current data
         */
        drop: function (conditions) {
            conditionalDeleting.call(this, conditions, true)
            return Object.values(this)
        },
        /**
         * Confine collection to the data satisfing all conditions,
         * using a JSON.stringify comparison.
         * @param {Object} conditions - one or more conditions
         * @return {Object[]} all current data
         */
        hold: function (conditions) {
            conditionalDeleting.call(this, conditions, false)
            return Object.values(this)
        },
        /**
         * Place an unkown record or remove a known record.
         * @param {Object} data - one unit
         * @return {Object[]} all current data
         */
        toggle: function (data) {
            const key = data[identifier]
            if (this.has(key)) {
                this.delete(key)
            } else {
                this.set(key, data)
            }
            return Object.values(this)
        },
    }

    return methods
}

export { getMainMethods }
