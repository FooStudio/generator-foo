/**
 * Helper Class to work with String
 * @class StringUtils
 * @namespace utils.types
 */
export default class StringUtils {

    /**
     * Regular Expression for email validation
     * @property {RegExp} VALIDATION_EMAIL
     * @default /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i
     * @static
     * @public
     */
    static get VALIDATION_EMAIL() {
        return /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    }

    /**
     * Determines if a string is a valid email
     * @method isValidEmail
     * @static
     * @public
     * @param  {string} email the string to be validated
     * @returns {boolean} A boolean indicating if is a valid email
     */
    static isValidEmail(email:string):boolean {
        return StringUtils.VALIDATION_EMAIL.test(email);
    }

    /**
     * Removes the invalid characters for file validation
     * @method stripInvalidFileCharacters
     * @static
     * @public
     * @param {string} text The string to be stripped
     * @returns {string} The string returned after evaluation
     */
    static stripInvalidFileCharacters(text:string):string {
        text = text.split(":").join("");
        return text;
    }

    /**
     * Transforms a title into a stub
     * @method makeStub
     * @static
     * @public
     * @param {string} text The string to be stub
     * @returns {string} The string returned after evaluation
     */
    static makeStub(text:string):string {
        return text.toLowerCase().replace("", "-").replace(/[^a-z0-9\-]/gi, "");
    }

    /**
     * Crops a String
     * @method cropText
     * @static
     * @public
     * @param {string} text The String to be cropped
     * @param {number} maximumLength  The maximum length the cropped text can have
     * @param {boolean} [breakAnywhere=false]  To break at any point in the String or at end of words, defaults to FALSE
     * @param {string} [postText=""] The String to be added after the cropped String, defaults to blank
     * @returns {string} The string returned after evaluation
     */
    static cropText(text:string, maximumLength:number, breakAnywhere:boolean = false, postText:string = ""):string {
        if (text.length <= maximumLength) return text;
        //Crops a long text, to get excerpts
        if (breakAnywhere) {
            return text.substr(0, Math.min(maximumLength, text.length)) + postText;
        }
        //Break on words only
        let lastIndex = 0;
        let prevIndex = 0;
        while (lastIndex < maximumLength && lastIndex > -1) {
            prevIndex = lastIndex;
            lastIndex = text.indexOf(" ", lastIndex + 1);
        }
        if (prevIndex === -1) {
            console.warn("Could not crop: ", prevIndex, lastIndex, text);
            prevIndex = maximumLength;
        }

        return text.substr(0, Math.max(0, prevIndex)) + postText;
    }


    /**
     * Returns everything after the first occurrence of the provided character in the string.
     * @method afterFirst
     * @static
     * @public
     * @param {string} pstring The string
     * @param {string} pchar the character or substring
     * @returns {string} The string returned after evaluation
     */
    static afterFirst(pstring:string, pchar:string):string {
        if (pstring === null) {
            return "";
        }
        let idx = pstring.indexOf(pchar);
        if (idx === -1) {
            return "";
        }
        idx += pchar.length;
        return pstring.substr(idx);
    }


    /**
     * Returns everything after the last occurrence of the provided character in pstring.
     * @method afterLast
     * @static
     * @public
     * @param {string} pstring the string to be evaluated
     * @param {string} pchar The string to evaluate
     * @returns {string} The string returned after evaluation
     */
    static afterLast(pstring:string, pchar:string):string {
        if (pstring === null) {
            return "";
        }
        let idx = pstring.lastIndexOf(pchar);
        if (idx === -1) {
            return "";
        }
        idx += pchar.length;
        return pstring.substr(idx);
    }

    /**
     * Determines whether the specified string begins with the specified prefix.
     * @method beginsWith
     * @static
     * @public
     * @param {string} pstring The string that the prefix will be checked against.
     * @param {string} pbegin The prefix that will be tested against the string.
     * @returns {boolean} A boolean determining if evaluation passed
     */
    static beginsWith(pstring:string, pbegin:string):boolean {
        if (pstring === null) {
            return false;
        }
        return pstring.indexOf(pbegin) === 0
    }

    /**
     * Returns everything before the first occurrence of the provided character in the string.
     * @method beforeFirst
     * @static
     * @public
     * @param {string} pstring The string to be evaluated
     * @param {string} pchar The string to evaluate with
     * @returns {string} The string returned after evaluation
     */
    static beforeFirst(pstring:string, pchar:string):string {
        if (pstring === null) {
            return "";
        }
        let idx = pstring.indexOf(pchar);
        if (idx === -1) {
            return "";
        }
        return pstring.substr(0, idx);
    }

    /**
     * Returns everything before the last occurrence of the provided character in the string.
     * @method beforeLast
     * @static
     * @public
     * @param {string} pstring the string to be evaluated
     * @param {string} pchar The string to evaluate
     * @returns {string} The string returned after evaluation
     */
    static beforeLast(pstring:string, pchar:string):string {
        if (pstring === null) {
            return "";
        }
        let idx = pstring.lastIndexOf(pchar);
        if (idx === -1) {
            return "";
        }
        return pstring.substr(0, idx);
    }

    /**
     * Returns everything after the first occurrence of pstart and before the first occurrence of pend in pstring.
     * @method between
     * @static
     * @public
     * @param {string} pstring The string
     * @param {string} pstart The character or sub-string to use as the start index.
     * @param {string} pend The character or sub-string to use as the end index.
     * @returns {string} The string returned after evaluation
     */
    static between(pstring:string, pstart:string, pend:string):string {
        let str = "";
        if (pstring === null) {
            return str;
        }
        let startIdx = pstring.indexOf(pstart);
        if (startIdx !== -1) {
            startIdx += pstart.length;
            let endIdx = pstring.indexOf(pend, startIdx);
            if (endIdx !== -1) {
                str = pstring.substr(startidx, endIdx - startIdx);
            }
        }
        return str;
    }

    /**
     * Determines whether the specified string contains any instances of pchar.
     * @method contains
     * @static
     * @public
     * @param {string} pstring The string to be validated
     * @param {string} pchar The string to validate in the string
     * @returns {boolean} A boolean determining if if the string validated
     */
    static contains(pstring:string, pchar:string):boolean {
        if (pstring === null) {
            return false;
        }
        return pstring.indexOf(pchar) !== -1;
    }

    /**
     * Determines whether the specified string ends with the specified suffix.
     * @method endsWith
     * @static
     * @public
     * @param {string} pstring The string to be validated
     * @param {string} pend The string to validate end
     * @returns {boolean} A boolean determining if the string validated
     */
    static endsWith(pstring:string, pend:string):boolean {
        return pstring.lastIndexOf(pend) === pstring.length - pend.length;
    }

    /**
     * Determines whether the specified string contains any characters.
     * @method isEmpty
     * @static
     * @public
     * @param {string} pstring The string to be validated
     * @returns {boolean} A boolean determining if the string was empty
     */
    static isEmpty(pstring:string):boolean {
        if (pstring === null) {
            return true;
        }
        return !pstring.length;
    }

    /**
     * Determines whether the specified string is numeric.
     * @method isNumeric
     * @static
     * @public
     * @param {string} pstring The string to ve validated
     * @returns {boolean} A boolean determining if the string is numeric
     */
    static isNumeric(pstring:string):boolean {
        if (pstring === null) {
            return false;
        }
        let regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
        return regx.test(pstring);
    }

    /**
     * Repeats a string
     * @method repeat
     * @static
     * @public
     * @param {string} string The string to be repeated
     * @param {number} amount the amount of repetitions for the string
     * @returns {string} the string repeated
     */
    static repeat(string:string, amount:number):string {
        let ret = "";
        for (let i:number = 0; i < amount; i++) {
            ret += string;
        }
        return ret;
    }

    /**
     * Add a character to the left of a string till it has a specified length
     * @method padLeft
     * @static
     * @public
     * @param {string} string The string to add the pad
     * @param {number} length The length of the pad to be added
     * @param {string} [fillChar=" "] The character to fill the pad
     * @returns {string} The string with the padding
     */
    static padLeft(string:string, length:number, fillChar:string = " "):string {
        if (fillChar == null || fillChar.length == 0) {
            throw "invalid value for fillChar: '" + fillChar + "'";
        }

        if (string.length < length) {
            let lim:number = length - string.length;
            for (let i:number = 0; i < lim; i++) {
                string = fillChar + string;
            }
        }
        return string;
    }

    /**
     * Add a character to the right of a string till it has a specified length
     * @method padRight
     * @static
     * @public
     * @param {string} string The string to add the pad
     * @param {number} length The length of the pad to be added
     * @param {string} [fillChar=" "] The character to fill the pad
     * @returns {string} The string with the padding
     */
    static padRight(string:string, length:number, fillChar:string = " "):string {
        if (fillChar == null || fillChar.length == 0) {
            throw "invalid value for fillChar: '" + fillChar + "'";
        }
        if (string.length < length) {
            let lim:number = length - string.length;
            for (let i:number = 0; i < lim; i++) {
                string += fillChar;
            }
        }
        return string;
    }

    /**
     * Replaces all tabs, newlines spaces to just one space
     * @method ignoreWhiteSpace
     * @static
     * @public
     * @param {string} string The string to be edited
     * @returns {string} The string trimmed of all tabs, newlines and spaces
     */
    static ignoreWhiteSpace(string:string):string {
        return string.replace(/[\t\r\n]|\s\s/g, "");
    }

    /**
     * Slugs the given string
     * @param {string} replace The string to be replaced
     * @returns {string} The slugged string
     */
    static slugify(replace):string {
        let st = replace.toLowerCase();
        st = st.replace(/[\u00C0-\u00C5]/ig, "a");
        st = st.replace(/[\u00C8-\u00CB]/ig, "e");
        st = st.replace(/[\u00CC-\u00CF]/ig, "i");
        st = st.replace(/[\u00D2-\u00D6]/ig, "o");
        st = st.replace(/[\u00D9-\u00DC]/ig, "u");
        st = st.replace(/[\u00D1]/ig, "n");
        st = st.replace(/[^a-z0-9 ]+/gi, "");
        st = st.trim().replace(/ /g, "-");
        st = st.replace(/[\-]{2}/g, "");
        return (st.replace(/[^a-z\- ]*/gi, ""));
    }

    /**
     *  Returns a string that replaces '\n' for 'b' html tags
     * @param {string} str The string to add line breaks form \n
     * @returns {string}
     */
    static addLineBreaks(str) {
        return str.replace(new RegExp("\r\n", "g"), "<br/>");
    }

    /**
     * Creates a html markup object for React set inner HTML
     * @param {string} text The text to be added
     * @returns {object}
     */
    static createTextMarkup(text) {
        return {__html: text};
    }

}
