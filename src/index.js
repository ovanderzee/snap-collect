const contextualCollection = function (identifier) {
    const methods = {
        keyProperty: () => identifier,

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

        // TODO:
        // combine.plus, dissect . share, exceptThis, except / minuas
    }
    return Object.create(methods)
}

export default contextualCollection
