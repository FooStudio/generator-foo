/**
 * Helper Class to work with boolean elements
 *
 *      import BooleanUtils from "foo/utils/types/BooleanUtils"
 *
 *      console.log(BooleanUtils.getBoolean("yes"));
 *      console.log(BooleanUtils.getBoolean("fkhjhjf"));
 *
 *
 * @class BooleanUtils
 * @namespace utils
 */
export default class BooleanUtils {
    /**
     * Returns if the specified value is a boolean
     * @method getBoolean
     * @static
     * @public
     * @param {object} value The value to be evaluated
     * @returns {boolean} if the specified value is a boolean
     */
    static getBoolean(value):boolean {
        if (!value) {
            return false;
        }
        if (typeof value == "object") {
            value = String(value);
        }
        if (typeof value == "string") {
            value.toString().toLowerCase();
        }
        switch (value) {
            case true:
            case "on":
            case "si":
            case "true":
            case "yes":
            case  "1":
            case 1:
            {
                return true;
            }
        }
        return false;
    }
}

