const contextualCollection = function (identifier) {
    var proto = {
        keyProperty: () => identifier,

        // maintenance functions

        add: function (data) {
            this[data[identifier].toString()] = data
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
    return Object.create(proto)
}

export default contextualCollection
