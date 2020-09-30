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
