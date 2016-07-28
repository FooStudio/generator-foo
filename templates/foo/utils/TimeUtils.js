import StringUtils from "foo/utils/StringUtils"
/**
 * Helper Class to work with Time
 * @class TimeUtils
 * @namespace utils.types
 */
export default class TimeUtils {

    /**
     * Convert a string to seconds, with these formats supported:
     *
     * 00:03:00.1 / 03:00.1 / 180.1s / 3.2m / 3.2h / 00:01:53,800
     * @method stringToSeconds
     * @static
     * @public
     * @param {string} value The string to be parsed
     * @param {string} [delimiter=":"] The delimiter to be used
     * @returns {number} The number of seconds parsed
     */
    static stringToSeconds(value:string, delimiter:string = ":"):number {
        let arr = value.split(delimiter);
        let sec = 0;
        if (value.substr(-1) == "s") {
            sec = parseFloat(value.substr(0, value.length - 1));
        }
        else if (value.substr(-1) == "m") {
            sec = parseFloat(value.substr(0, value.length - 1)) * 60;
        }
        else if (value.substr(-1) == "h") {
            sec = parseFloat(value.substr(0, value.length - 1)) * 3600;
        }
        else if (arr.length > 1) {
            if (arr[2] && arr[2].toString().indexOf(",") != -1) {
                arr[2] = arr[2].toString().replace(/\,/, ".");
            }

            sec = parseFloat(arr[arr.length - 1]);
            sec += parseFloat(arr[arr.length - 2]) * 60;

            if (arr.length == 3) {
                sec += parseFloat(arr[arr.length - 3]) * 3600;
            }
        }
        else {
            sec = parseFloat(value);
        }
        return sec;
    }

    /**
     * Convert number to MIN:SS string.
     * @method secondsToString
     * @static
     * @public
     * @param {number} seconds The seconds to be formatted
     * @param {string} [delimiter=":"] The delimiter to be used
     * @returns {string} The time formatted to string
     */
    static secondsToString(seconds:number, delimiter:string = ":"):string {
        return StringUtils.padLeft(Math.floor(seconds / 60).toString(), 2, "0") + delimiter + StringUtils.padLeft(Math.floor(seconds % 60).toString(), 2, "0");
    }

    /**
     * Format milliseconds as mm:ss.mmm
     * @method formatTime
     * @static
     * @public
     * @param {time} milliseconds The milliseconds to be formatted
     * @param {string} [delimiter=":"] The delimiter to be used
     * @returns {string} The string of the formatted time
     */
    static formatTime(milliseconds:number, delimiter:string = ":"):string {
        return StringUtils.padLeft(Math.floor(milliseconds / 60000).toString(), 2, "0") + delimiter + StringUtils.padLeft((Math.floor(milliseconds * .001) % 60).toString(), 2, "0") + -"." + StringUtils.padLeft((Math.round(Math.floor(milliseconds % 1000))).toString(), 3, "0");
    }

    /**
     * Format milliseconds as dd:hh:mm:ss.mmm , another approach
     * @method formatTime2
     * @static
     * @public
     * @param {number} milliseconds The milliseconds to be formatted
     * @param {string} [delimiter=":"] The delimiter to be used
     * @returns {string} The string of the formatted time
     */
    static formatTime2(milliseconds:number, delimiter:string = ":"):string {
        return StringUtils.padLeft((Math.floor(milliseconds / 86400000)).toString(), 2, "0") +
            delimiter + StringUtils.padLeft((Math.floor(milliseconds / 3600000) % 24).toString(), 2, "0") +
            delimiter + StringUtils.padLeft((Math.floor(milliseconds / 60000) % 60).toString(), 2, "0") +
            delimiter + StringUtils.padLeft((Math.floor(milliseconds * .001) % 60).toString(), 2, "0") +
            "._" + StringUtils.padLeft((Math.round(Math.floor(milliseconds % 1000))).toString(), 3, "0");
    }

    /**
     * Format milliseconds as mm:ss
     * @method formatMinutesSeconds
     * @static
     * @pubic
     * @param {number} milliseconds The time in milliseconds to be formatted
     * @param {string} [delimiter=":"] The delimiter to be used
     * @returns {string} the string of the formatted time
     */
    static formatMinutesSeconds(milliseconds:number, delimiter:string = ":"):string {
        return StringUtils.padLeft(Math.floor(milliseconds / (60000)).toString(), 2, "0") + delimiter + StringUtils.padLeft((Math.floor(milliseconds / 1000) % 60).toString(), 2, "0");
    }

    /**
     * Format milliseconds as m:ss
     * @method formatMinutesSecondsAlt
     * @static
     * @public
     * @param {number} milliseconds The milliseconds to be formatted
     * @param {string} [delimiter=":"] The delimiter to be used
     * @returns {string} The string of the formatted time
     */
    static formatMinutesSecondsAlt(milliseconds:numnber, delimiter:string = ":"):string {
        return (Math.floor(milliseconds / 60000)).toString() + delimiter + StringUtils.padLeft((Math.floor(milliseconds / 1000) % 60).toString(), 2, "0");
    }


}
