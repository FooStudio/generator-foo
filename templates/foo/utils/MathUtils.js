/**
 * Helper Class to work with Maths
 * @class MathUtils
 * @namespace utils.types
 */

export default class MathUtils {

    /**
     * Calculates the angle of a vector.
     * @method angle
     * @static
     * @public
     * @param {number} dx the x component of the vector
     * @param {number} dy the y component of the vector
     * @returns {number} The the angle of the passed vector in degrees.
     */
    static angle(dx:number, dy:number):number {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    /**
     * The <code>getRandomInt</code> method returns an int value between a Minimum and a Maximum int
     * @method getRandomInt
     * @static
     * @public
     * @param {number} min The min integer
     * @param {number} max The max integer
     * @returns {number} The random integer
     */
    static getRandomInt(min:number, max:number):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    /**
     * The <code>getRandomNumber</code> method returns Number value between a Minimum and a Maximum Number
     * @method getRandomNumber
     * @static
     * @public
     * @param {number} min The min number
     * @param {number} max The max number
     * @returns {number} the random number
     */
    static getRandomNumber(min:number, max:number):number {
        return min + (Math.random() * (max - min));
    }

    /**
     * The <code>normalize</code> method
     * @method normalize
     * @static
     * @public
     * @param {number} value The value
     * @param {number} min The min value
     * @param {number} max The max value
     * @returns {number} the normalize result
     */
    static normalize(value:number, min:number, max:number):number {
        return (value - min) / (max - min);
    }

    /**
     * The <code>interpolate</code> method
     * @method interpolate
     * @static
     * @public
     * @param {number} value The value
     * @param {number} min The min value
     * @param {number} max the max value
     * @returns {number} The interpolation result
     */
    static interpolate(value:number, min:number, max:number) {
        return min + (max - min) * value;
    }

    /**
     * The <code>map</code> method
     * @method map
     * @static
     * @public
     * @param {number} value The value
     * @param {number} min1 The min 1 value
     * @param {number} max1 The max 1 value
     * @param {number} min2 The min 2 value
     * @param {number} max2 the max 2 value
     * @returns {number} The map result
     */
    static map(value:number, min1:number, max1:number, min2:number, max2:number):number {
        return MathUtils.interpolate(MathUtils.normalize(value, min1, max1), min2, max2);
    }

    /**
     * The <code>findPreferredRatio</code> is used to find the correct ratio to fit content in a container using a maximum area.
     * @method findPreferredRadio
     * @static
     * @public
     * @param {number} width The width
     * @param {number} height The height
     * @param {number} maxwidth The max width
     * @param {number} maxHeight The max height
     * @returns {number} The preferred radio
     */
    static findPreferredRadio(width:number, height:number, maxwidth:number, maxHeight:number):number {
        let dw = maxwidth / width;
        let dh = maxHeight / height;
        return dw < dh ? dw : dh;
    }

    /**
     * The <code>limit()</code> method checks if a given value is within a specific range.
     *  It returns the value if it's within the range.
     *  It returns the min/max value if the value is lower/higher than the min/max.
     * @method limit
     * @static
     * @public
     * @param {number} value The value
     * @param {number} min The min value
     * @param {number} max The max value
     * @returns {number} The number limited
     */
    static limit(value:number, min:number, max:number):number {
        return Math.min(Math.max(min, value), max);
    }

    /**
     * The <code>roundNumber()</code> method
     * @method roundNumber
     * @static
     * @public
     * @param {number} val Specifies the Number to round.
     * @param {number} [digits=0] Specifies the digits after the comma.
     * @returns {number} The number rounbded
     */
    static roundNumber(val:number, digits:number = 0):number {
        let factor = Math.pow(10, digits);
        return Math.round(val * factor) / factor;
    }

    /**
     * The <code>degreesToRadians()</code> method calculates degrees to radians
     * @method degreesToRadians
     * @static
     * @public
     * @param {number} degrees The degrees to be transformed
     * @returns {number} The angle in radians
     */
    static degreesToRadians(degrees:number):number {
        return degrees * (Math.PI / 180);
    }

    /**
     * The <code>degreesToRadians()</code> method calculates degrees to radians
     * @method radiansToDegrees
     * @static
     * @public
     * @param {number} radians the radians to be transformed
     * @returns {number} The angle in degrees
     */
    static radiansToDegrees(radians:number):number {
        return radians * (180 / Math.PI);
    }

}
