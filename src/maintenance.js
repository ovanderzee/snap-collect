import { conditionalDeleting, arrayToSnapCollect } from './functions'

const getMainMethods = function (identifier) {
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
         * @param {Object[] || SnapCollect} foreignItem
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
        },
        /**
         * Delete data satisfing all conditions,
         * using a JSON.stringify comparison.
         * @param {Object} conditions - one or more conditions
         */
        drop: function (conditions) {
            conditionalDeleting.call(this, conditions, true)
        },
        /**
         * Confine collection to the data satisfing all conditions,
         * using a JSON.stringify comparison.
         * @param {Object} conditions - one or more conditions
         */
        hold: function (conditions) {
            conditionalDeleting.call(this, conditions, false)
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
    }

    return methods
}

export { getMainMethods }
