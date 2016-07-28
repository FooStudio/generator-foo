/**
 * Helper Class to work with Date objects
 * @class DateUtils
 * @namespace utils
 */
export default class DateUtils {

    static DAYS_IN_JANUARY = 31;
    static DAYS_IN_FEBRUARY = 28;
    static DAYS_IN_FEBRUARY_LEAP_YEAR = 29;
    static DAYS_IN_MARCH = 31;
    static DAYS_IN_APRIL = 30;
    static DAYS_IN_MAY = 31;
    static DAYS_IN_JUNE = 30;
    static DAYS_IN_JULY = 31;
    static DAYS_IN_AUGUST = 31;
    static DAYS_IN_SEPTEMBER = 30;
    static DAYS_IN_OCTOBER = 31;
    static DAYS_IN_NOVEMBER = 30;
    static DAYS_IN_DECEMBER = 31;
    static DAYS_IN_YEAR = 365;
    static DAYS_IN_LEAP_YEAR = 366;

    /**
     * The number of days appearing in each month. May be used for easy index lookups.
     * The stored value for February corresponds to a standard year--not a leap year.
     * @type {number[]}
     * @property DAYS_IN_MONTHS
     * @static
     * @public
     */
    static DAYS_IN_MONTHS = [DateUtils.DAYS_IN_JANUARY, DateUtils.DAYS_IN_FEBRUARY, DateUtils.DAYS_IN_MARCH, DateUtils.DAYS_IN_APRIL, DateUtils.DAYS_IN_MAY, DateUtils.DAYS_IN_JUNE, DateUtils.DAYS_IN_JULY, DateUtils.DAYS_IN_AUGUST, DateUtils.DAYS_IN_SEPTEMBER, DateUtils.DAYS_IN_OCTOBER, DateUtils.DAYS_IN_NOVEMBER, DateUtils.DAYS_IN_DECEMBER];

    /**
     * Timezone abbreviation
     * @type {string[]}
     * @property _TIMEZONES
     * @private
     * @static
     */
    static _TIMEZONES = ["IDLW", "NT", "HST", "AKST", "PST", "MST", "CST", "EST", "AST", "ADT", "AT", "WAT", "GMT", "CET", "EET", "MSK", "ZP4", "ZP5", "ZP6", "WAST", "WST", "JST", "AEST", "AEDT", "NZST"];

    /**
     * Array to transform the format 0(sun)-6(sat) to 1(mon)-7(sun)
     * @type {number[]}
     * @private
     * @static
     * @property _MONDAY_STARTING_WEEK
     */
    static _MONDAY_STARTING_WEEK = [7, 1, 2, 3, 4, 5, 6];

    /**
     * Parse a SQL-DATETIME (YYYY-MM-DD HH:MM:SS) to a Date
     * @method parseFromSqlDateTime
     * @static
     * @public
     * @param {string} dateTime an SQL-DATETIME (YYYY-MM-DD HH:MM:SS)
     * @returns {date} The date of the supplied string
     */
    static parseFromSqlDateTime(dateTime) {
        if (dateTime === null) {
            return null;
        }
        dateTime = dateTime.replace(/-/g, "/");
        dateTime = dateTime.replace("T", " ");
        dateTime = dateTime.replace("Z", " GMT-0000");
        dateTime = dateTime.replace(/\.[0-9]{3}/g, "");

        let date = new Date(Date.parse(dateTime));
        if (date.toString() === "Invalid Date") {
            return null;
        } else {
            return date;
        }
    }

    /**
     * Returns a two digit representation of the year represented by the specified date.
     * @method getShortYear
     * @static
     * @public
     * @param {date} date The date to be parsed
     * @returns {string} The resulting string
     */
    static getShortYear(date:date):string {
        let year = date.getFullYear().toString();
        if (year.length < 3) {
            return year;
        }
        return (year.substr(year.length - 2));
    }

    /**
     * Compares two dates and returns an integer depending on their relationship.
     *
     *      Returns -1 if d1 is greater than d2.
     *      Returns 1 if d2 is greater than d1.
     *      Returns 0 if both dates are equal.
     *
     * @method compareDate
     * @static
     * @public
     * @param {date} date1 The date that will be compared to the second date.
     * @param {date} date2 The date that will be compared to the first date.
     * @returns {number} The number of the result
     */
    static compareDate(date1:date, date2:date):string {
        let d1ms = date1.getTime();
        let d2ms = date2.getTime();

        if (d1ms > d2ms) {
            return -1;
        } else if (d1ms < d2ms) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Returns a short hour (0 - 12) represented by the specified date.
     *      If the hour is less than 12 (0 - 11 AM) then the hour will be returned.
     *      If the hour is greater than 12 (12 - 23 PM) then the hour minus 12 will be returned.
     * @method getShortHour
     * @static
     * @public
     * @param {date} date The date to be parsed
     * @returns {number} The hours parsed from date
     */
    static getShortHour(date:date):number {
        let h = date.getHours();
        if (h === 0 || h === 12) {
            return 12;
        } else if (h > 12) {
            return h - 12;
        } else {
            return h;
        }
    }

    /**
     * Determines the number of days between the start value and the end value. The result
     * may contain a fractional part, so cast it to int if a whole number is desired.
     * @method countDays
     * @static
     * @public
     * @param {date} start The start date
     * @param {date} end The end date
     * @returns {number} The number of days between
     */
    static countDays(start:date, end:date):number {
        return Math.abs(end.valueOf() - start.valueOf()) / (1000 * 60 * 60 * 24);
    }

    /**
     * Determines if the input year is a leap year (with 366 days, rather than 365).
     * @method isLeapYear
     * @static
     * @public
     * @param {*} year the year value as stored in a Date object.
     * @returns {boolean} A boolean determining if the year is leap
     */
    static isLeapYear(year):boolean {
        if (year % 100 === 0) {
            return year % 400 === 0;
        }
        return year % 4 === 0;
    }

    /**
     * Determines if the dates are the same day
     * @param {date} compare The first Date to compare
     * @param {date} to The seconds Date to compare
     * @returns {boolean} A boolean determining if the two days are the same
     */
    static isSameDay(compare:date, to:date):boolean {
        if (compare.getFullYear() !== to.getFullYear()) {
            return false;
        }
        if (compare.getMonth() !== to.getMonth()) {
            return false;
        }
        if (compare.getDate() !== to.getDate()) {
            return false;
        }
        return true;
    }

    /**
     * Calculate the age of the supplied date
     * @method age
     * @static
     * @public
     * @param {date} birthdate The birthdate to calculate the age for
     * @param {date} [on] Date on which the age is calculated. If null, the current date is used.
     * @returns {number} The age in number of the supplied Date
     */
    static age(birthdate:date, on:date = null):number {
        if (!on) {
            on = new Date();
        }
        let _age = on.getFullYear() - birthdate.getFullYear();
        if (birthdate.getMonth() < on.getMonth()) {
            return _age;
        }
        if (birthdate.getMonth() > on.getMonth()) {
            return _age - 1;
        }
        if (birthdate.getDate() <= on.getDate()) {
            return _age;
        }
        return _age - 1;
    }

    /**
     * Checks if a date is the same as or older then a given years
     * @method ageCheck
     * @static
     * @public
     * @param {date} date The Date to be validated
     * @param {number} years The minimum years
     * @returns {boolean} A boolean determining if the Date is valid
     */
    static ageCheck(date:date, years:number):boolean {
        return DateUtils.age(date) >= years;
    }

    /**
     * Number of days in the current month (such as 28-31)
     * @method getDaysOfMonth
     * @static
     * @public
     * @param {date} date The Date to be evaluated
     * @returns {number} the number of days in month
     */
    static getDaysOfMonth(date:date):number {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    /**
     * Returns a string indicating whether the date represents a time in the ante meridian (AM) or post meridian (PM).
     * @method getAMPM
     * @static
     * @public
     * @param {date} date The date to ve evaluated
     * @returns {string} The resulting string of hours
     */
    static getAMPM(date:date):string {
        return (date.getHours() > 11) ? "PM" : "AM";
    }

    /**
     * Returns the number of the current week for the year, a week starts with monday
     * @method getWeekOfYear
     * @static
     * @public
     * @param {date} date The date to be evaluated
     * @returns {number} The number of week of the current date
     */
    static getWeekOfYear(date:date):number {
        let dayOfYear = DateUtils.getDayOfYear(date);
        let firstDay = new Date(date.getFullYear(), 0, 1);
        let fullWeeks = (dayOfYear - (DateUtils._MONDAY_STARTING_WEEK[date.getDay()] + (7 - DateUtils._MONDAY_STARTING_WEEK[firstDay.getDay()])) ) / 7;
        if (DateUtils._MONDAY_STARTING_WEEK[firstDay.getDay()] <= 4) {
            fullWeeks++;
        }
        fullWeeks++;
        return fullWeeks;
    }

    /**
     * returns the day of the year, starting with 0 (0-365)
     * @method getDayOfYear
     * @static
     * @public
     * @param {date} date The date to be evaluated
     * @returns {number} The day number in current year of the current Date
     */
    static getDayOfYear(date:date):number {
        let firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        let milliseondsOffset = date.getTime() - firstDayOfYear.getTime();
        return Math.floor(milliseondsOffset / 86400000);
    }

    /**
     * Gets the next date in the week for the given time and day. Useful for weekly countdowns
     * @param {number} day The day for the countdown. 0 starts at sunday, so every monday at 20:00 is: getNextInWeekDatefor (1, 20);
     * @param {number} hours The hours of the time
     * @param {number} minutes The minutes of the time
     * @param {number} seconds The seconds of the time
     * @returns {Date} The resulting Date
     */
    static getNextInWeekDateFor(day:number, hours:number, minutes:number, seconds:number):date {
        let d = new Date();
        let targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes, seconds);
        if (targetDate.getDay() != day) {
            targetDate.setDate(targetDate.getDate() + (((day + 7) - targetDate.getDay()) % 7));
        }
        else if (d.getTime() > targetDate.getTime()) {
            targetDate.setDate(targetDate.getDate() + 7);
        }
        return targetDate;
    }

    /**
     * Returns the difference in days between to days. Useful for displaying a date like "today", "tomorrow" or "yesterday"
     * @method getDayDifference
     * @static
     * @public
     * @param {date} date1 The first date
     * @param {date} date2 the second date
     * @returns {number} The difference of days in number
     */
    static getDayDifference(date1, date2) {
        if (!date2) {
            date2 = new Date();
        }

        return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime() - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime()) / 86400000;
    }

}
