const { MONTHS, QARN_SAGIR, DAYS_IN_YEAR } = require('./constants');
const {
    gregorianToAJD,
    ajdToGregorian,
    misriDateToAjd,
    misriDateFromAjd
} = require('./conversions');

class MisriDate {
    constructor(year, month, date) {
        const args = [year, month, date]
        if (MisriDate.isValid(year, month, date)) {
            //When all three parameters are passed
            this.date = date;
            this.month = month;
            this.year = year;
        }
        else if (args.every(arg => !arg)) {
            //When no parameters are passed
            const misriDate = MisriDate.fromGregorian(new Date());
            this.date = misriDate.date;
            this.month = misriDate.month;
            this.year = misriDate.year;
        }
        else {
            throw new Error("Pass valid arguments")
        }
    }

    compare(other) {
        if (!(other instanceof MisriDate)) {
            throw new Error("Misri Date must be compared with Misri Date");
        }

        if (this.equals(other)) {
            return 0;
        }
        if(this.gregorianDate > other.gregorianDate) {
            return 1;
        }
        return -1;
    }

    equals(other) {
        if (this === other) {
            return true;
        }

        if (!(other instanceof MisriDate)) {
            return false;
        }

        return this.date === other.date && this.month === other.month && this.year === other.year;
    }

    toString() {
        return `${this.date} ${MONTHS[this.month - 1].en} ${this.year}H`
    }

    static fromGregorian(gregorianDate) {
        if (!(gregorianDate instanceof Date)) throw new Error("parameter should be of type Date")
        const misriDateParams = misriDateFromAjd(gregorianToAJD(gregorianDate));
        return new MisriDate(...misriDateParams)
    }

    static isValid(year, month, date) {
        const areMonthAndDatePositiveIntegers = [month, date].every(arg => arg && Number.isInteger(arg) && arg > 0);
        const isYearAnInteger = Number.isInteger(year)
        const isMonthInRange = month <= 12;
        const isKabisaYear = QARN_SAGIR.some(qs => qs === year % 30);
        const dateUpperLimit = (month % 2 === 1) || (isKabisaYear && month === 12) ? 30 : 29;
        const isDateInRange = date < dateUpperLimit;
        return areMonthAndDatePositiveIntegers && isYearAnInteger && isMonthInRange && isDateInRange
    }

    get dayOfYear() {
        return (this.month === 1) ? this.date : (DAYS_IN_YEAR[this.month - 2] + this.date);
    }

    get gregorianDate() {
        return ajdToGregorian(misriDateToAjd(this));
    }
}

module.exports = MisriDate