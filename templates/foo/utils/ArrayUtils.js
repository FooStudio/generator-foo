/**
 * Helper Class to work with Arrays
 *
 *      import ArrayUtils from "foo/utils/types/ArrayUtils"
 *
 *      let arr = [10, 20, 30, 40];
 *
 *      let resultArray = ArrayUtils.contains(40);
 *
 *      console.log(resultArray); // true
 *
 * @module foo
 * @namespace utils
 * @class ArrayUtils
 */
export default class ArrayUtils {

    /**
     * @static
     * @public
     * @property CASEINSENSITIVE
     * @type {number}
     * @default 1
     */
    static CASEINSENSITIVE = 1;
    /**
     * @static
     * @public
     * @property DESCENDING
     * @type {number}
     * @default 2
     */
    static DESCENDING = 2;
    /**
     * @static
     * @public
     * @property UNIQUESORT
     * @type {number}
     * @default 4
     */
    static UNIQUESORT = 4;
    /**
     * @static
     * @public
     * @property RETURNINDEXEDARRAY
     * @type {number}
     * @default 8
     */
    static RETURNINDEXEDARRAY = 8;
    /**
     * @static
     * @public
     * @property NUMERIC
     * @type {number}
     * @default 16
     */
    static NUMERIC = 16;


    /**
     * Checks if an array contains a specific value
     * @param {Array} array The Array to be searched
     * @param {object} value The value to be looked for
     * @returns {boolean} A boolean determining if the value is in the Array
     * @method contains
     * @public
     * @static
     */
    static contains(array:array, value):boolean {
        return (array.indexOf(value) != -1);
    }

    /**
     * Checks if an element in the array has a field with a specific value
     * @param {array} array The array to be searched
     * @param {string} field The field on the Array to be searched
     * @param {Object} value The value the field must have
     * @return {boolean} A boolean determining if the value is in the Array
     * @method inArrayField
     * @static
     * @public
     */
    static inArrayField(array:array, field, value):boolean {
        for (let i = 0; i < array.length; i++) {
            if (array[i][field] == value) return true;
        }
        return false;
    }

    /**
     * Returns a random element from the Array
     * @method randomElement
     * @static
     * @param {array} array The Array to extract a random element
     * @returns {Object} The extracted element
     * @public
     */
    static randomElement(array:array) {
        if (array.length > 0) {
            return array[Math.floor(Math.random * array.length)];
        }
        return null;
    }

    /**
     * Shuffles an array (sort random)
     * @static
     * @public
     * @method shuffle
     * @param {array} array The Array to be shuffled
     * @returns {void}
     */
    static shuffle(array:array) {
        let i = array.length;
        if (i == 0) {
            return;
        }
        let j;
        let temp;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    /**
     * Copies the source to the target array, without removing the reference
     *
     * @method copy
     * @static
     * @public
     * @param {array} array The Array to be copied
     * @param {array} target The Array to copy the supplied Array
     * @returns {void}
     */
    static copy(array:array, target:array) {
        let leni = target.length = array.length;
        for (let i = 0; i < leni; i++) {
            target[i] = array[i];
        }
    }

    /**
     * Recursively clone an Array and its subArray (doesn't clone content objects)
     * @method deepArrayClone
     * @static
     * @public
     * @param {array} array The Array to be cloned
     * @return {array} the cloned Array
     */
    static deepArrayClone(array):array {
        let ret = array.concat();
        let iLim = ret.length;
        let i;
        for (i = 0; i < iLim; i++) {
            ret[i] = ArrayUtils.deepArrayClone(ret[i]);
        }
        return ret;
    }

    /**
     * Calculates the average value of all elements in an array.
     * Works only for array with numeric values
     * @method average
     * @static
     * @public
     * @param {array} array The array to get the average value
     * @return {number} The average value
     */
    static average(array:array):number {
        if (array == null || array.length == 0) return NaN;
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }
        return total / array.length;
    }

    /**
     * Remove all instances of the specified value from the array
     * @method removeValueFromArray
     * @static
     * @public
     * @param {array} array The Array t removed elements from
     * @param {object} value The value to be removed
     * @return {number} The number of removed items
     */
    static removeValueFromArray(array:array, value):number {
        let total = 0;
        for (let i = array.length; i > -1; i--) {
            if (array[i] === value) {
                array.splice(i, 1);
                total++;
            }
        }
        return total;
    }

    /**
     * Removes a single (first occurring) value from an Array
     * @method removeValueFromArrayOnce
     * @static
     * @public
     * @param {array} array The array to remove the element
     * @param {object} value The value to be removed
     * @returns {boolean} A boolean which indicates if a value was removed
     */
    static removeValueFromArrayOnce(array:array, value):boolean {
        let len = array.length;
        for (let i = len; i > -1; i--) {
            if (array[i] === value) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Creates a new array that only contains unique instances of objects
     * @method createUniqueCopy
     * @static
     * @public
     * @param {array} array The Array to be processed
     * @return {Array} The array with unique instances
     */
    static createUniqueCopy(array:array):array {
        let newArray = [];
        let len = array.length;
        let item;

        for (let i = 0; i < len; i++) {
            item = array[i];
            if (ArrayUtils.inArray(newArray, item)) {
                continue;
            }
            newArray.push(item);
        }
        return newArray;
    }

    /**
     * Creates a copy of the specified Array.
     *
     * Note that the array returned is a new array but the items are not copies of the items in the original array,
     * just references to the same items.
     * @method clone
     * @static
     * @public
     * @param {array} array The Array to be cloned
     * @return {array} The cloned Array
     */
    static clone(array:array):array {
        return array.slice(0, array.length);
    }

    /**
     * Compares two arrays and returns a boolean indicating whether the arrays contain the same values at the same indexes
     * @method areEqual
     * @static
     * @public
     * @param {array} array1 An Array to compare
     * @param {array} array2 An Array to compare
     * @return {boolean} A boolean determining if the two Arrays were equal
     */
    static areEqual(array1:array, array2:array):boolean {
        if (array1 == array2) {
            return true;
        }
        if (array1.length != array2.length) {
            return false;
        }

        for (let i = array1.length - 1; i >= 0; i--) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return the amount of (not empty) items in an Array
     * @method filledLength
     * @static
     * @public
     * @param {array} array The Array to be evaluated
     * @return {number} The amount of not empty items
     */
    static filledLength(array:array):number {
        let length = 0;
        let leni = array.length;
        for (let i = 0; i < leni; i++) {
            if (array[i] != undefined) length++;
        }
        return length;
    }

    /**
     * Returns the items that are unique in the first array
     * @method getUniqueFirst
     * @static
     * @public
     * @param {array} array1 The array to be evaluated
     * @param {array} array2 The second array to be evaluated
     * @return {Array} The resulting array with the items unique in first array
     */
    static getUniqueFirst(array1:array, array2:array):boolean {
        let ret = [];
        for (let i = 0; i < array1.length; i++) {
            if (array2.indexOf(array1[i]) == -1) ret.push(array1[i]);
        }
        return ret;
    }

    /**
     * Returns the items that are in both arrays.
     * @method intersect
     * @static
     * @public
     * @param {array} array1 The Array to be evaluated
     * @param {array} array2 The array to be evaluated
     * @return {Array} The resulting array
     */
    static intersect(array1:array, array2:array):array {
        let ret = [];
        let i;

        for (i = 0; i < array1.length; i++) {
            if (array2.indexOf(array1[i]) != -1) ret.push(array1[i]);
        }
        for (i = 0; i < array2.length; i++) {
            if (array1.indexOf(array2[i]) != -1) ret.push(array2[i]);
        }

        ret = ArrayUtils.createUniqueCopy(ret);

        return ret;
    }

    /**
     * Adds elements to an Array the amount of times specified
     * @method addElements
     * @static
     * @public
     * @param {object} element The element to be added
     * @param {number} [amount=1] The amount of times to be added
     * @param {array} [array] The Array to add elements
     * @return {Array} The Array with the added elements
     */
    static addElements(element, amount:number = 1, array:array = []):array {
        for (let i = 0; i < amount; i++) {
            array.push(element);
        }
        return array;
    }

    /**
     * Returns an new Array from an Array without the empty elements
     * @method removeEmptyElements
     * @static
     * @public
     * @param {array} array The Array to remove empty elements from
     * @return {Array} The new Array without empty elements
     */
    static removeEmptyElements(array:array):array {
        let results = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] != "" && array[i] != null && array[i] != undefined) results.push(array[i]);
        }
        return results;
    }

    /**
     * script: Array.sortOn.js

     description: Adds Array.sortOn function and related constants that works like in ActionScript for sorting arrays of objects (applying all same strict rules)

     license: MIT-style license.

     authors:
     - gonchuki

     github: https://github.com/gonchuki/mootools-Array.sortOn/blob/master/Source/Array.sortOn.js
     docs: http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/Array.html#sortOn()

     requires:
     - core/1.2.4: [Array]

     provides:
     - [sortOn, CASEINSENSITIVE, DESCENDING, UNIQUESORT, RETURNINDEXEDARRAY, NUMERIC]

     * @method sortOn
     * @static
     * @public
     * @param {array} array The array to be sorted
     * @param {array} fields The fields to take into account
     * @param {object} options The sort options
     * @return {*} The array sorted
     */
    static sortOn(array, fields, options) {
        let dupFn = function (field, fieldOptions) {
            let filtered = (fieldOptions & ArrayUtils.NUMERIC)
                ? this.map(function (item) {
                return item[field].toFloat();
            })
                : (fieldOptions & ArrayUtils.CASEINSENSITIVE)
                ? this.map(function (item) {
                return item[field].toLowerCase();
            })
                : this.map(function (item) {
                return item[field];
            });
            return filtered.length !== []["combine"](filtered).length;
        };

        let sortFn = function (itemA, itemB, fields, options) {
            return (function sortBy(fields, options) {
                let ret, a, b,
                    opts = options[0],
                    subFields = fields[0].match(/[^.]+/g);

                (function getValues(sFields, sA, sB) {
                    let field = sFields[0];
                    if (sFields.length > 1) {
                        getValues(sFields.slice(1), sA[field], sB[field]);
                    } else {
                        a = sA[field].toString();
                        b = sB[field].toString();
                    }
                })(subFields, itemA, itemB);

                if (opts && ArrayUtils.NUMERIC) {
                    ret = (a.toFloat() - b.toFloat());
                } else {
                    if (opts && ArrayUtils.CASEINSENSITIVE) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                    }

                    ret = (a > b) ? 1 : (a < b) ? -1 : 0;
                }

                if ((ret === 0) && (fields.length > 1)) {
                    ret = sortBy(fields.slice(1), options.slice(1));
                } else if (opts && ArrayUtils.DESCENDING) {
                    ret *= -1;
                }

                return ret;
            })(fields, options);
        };

        fields = Array["from"](fields);
        options = Array["from"](options);

        if (options.length !== fields.length) options = [];

        if ((options[0] & ArrayUtils.UNIQUESORT) && (fields.some(function (field, i) {
                return dupFn(field, options[i]);
            }))) return 0;

        let currySort = function (itemA, itemB) {
            return sortFn(itemA, itemB, fields, options);
        };

        if (options[0] && ArrayUtils.RETURNINDEXEDARRAY) {
            return array.concat().sort(currySort);
        }
        else {
            return array.sort(currySort);
        }
    }

}

