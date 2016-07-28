/**
 * Helper Class to work with objects
 * @class ObjectUtils
 * @name utils.types
 */
export default class ObjectUtils {

    /**
     * Checks if the object has (one or more) values
     * @method hasValues
     * @static
     * @public
     * @param {object} object The object
     * @returns {boolean} A boolean determining if the object has values
     */
    static hasValues(object):boolean {
        if (object instanceof Array) return object.length > 0;
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Counts the number of elements in an Object
     * @method getLength
     * @static
     * @public
     * @param {object} object The object
     * @returns {number} The length of elements in object
     */
    static getLength(object):number {
        let count = 0;
        for (let key in object) {
            count++;
        }
        return count;
    }

    /**
     * Get the keys of an object.
     * @method getKeys
     * @static
     * @public
     * @param {object} object The object to extract keys from
     * @returns {Array.<String>} The array of keys of the given object
     */
    static getKeys(object):array {
        let keys = [];
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    /**
     * Get the values of an object.
     * @method getValues
     * @static
     * @public
     * @param {object} object The object to extract values
     * @returns {Array} The array of values of the given object
     */
    static getValues(object):array {
        let values = [];
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                values.push(object[key]);
            }
        }
        return values;
    }

    /**
     * Check if there are properties defined
     * @method hasKeys
     * @static
     * @public
     * @param {object} object The object to be checked
     * @returns {boolean} A boolean determining if the object has keys
     */
    static hasKeys(object):boolean {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }

}
