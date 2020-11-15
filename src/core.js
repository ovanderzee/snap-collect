import { keying } from './functions'

const coreMethods = {
    // core functions

    /**
     * Delete the data kept with a key, and the key itself.
     * @param {String} key
     */
    delete: function (key) {
        if (!keying.test(key)) return
        delete this[keying.make(key)]
    },
    /**
     * Get the data kept with a key.
     * @param {String} key
     * @return {Object} the data
     */
    get: function (key) {
        if (!keying.test(key)) return
        return this[keying.make(key)]
    },
    /**
     * Examine the existance of a key.
     * @param {String} key
     * @return {Boolean}
     */
    has: function (key) {
        if (!keying.test(key)) return
        return Object.prototype.hasOwnProperty.call(this, keying.make(key))
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
        if (!keying.test(key)) return
        this[keying.make(key)] = data
    },
}

export { coreMethods }
