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
                delete this[key.toString()]
            }
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
    }

    return methods
}

export { getMainMethods }
