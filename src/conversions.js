const { DAYS_IN_30_YEARS, DAYS_IN_YEAR } = require('./src/constants')

// return Astronomical Julian Date corresponding to the specified Gregorian Date object
function gregorianToAJD(date) {
    let a, b,
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate()
    if (month < 3) {
        year--;
        month += 12;
    }
    // is date a julian date
    if (date < new Date(1582, 9, 5)) {
        b = 0;
    } else {
        a = Math.floor(year / 100);
        b = 2 - a + Math.floor(a / 4);
    }
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

function ajdToGregorian(ajd) {
    let a;
    const z = Math.floor(ajd + 0.5);
    const f = (ajd + 0.5 - z);
    if (z < 2299161) {
        a = z;
    } else {
        const alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(0.25 * alpha);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);

    const day = b - d - Math.floor(30.6001 * e) + f;
    const month = (e < 14) ? (e - 2) : (e - 14);
    const year = (month < 2) ? (c - 4715) : (c - 4716);
    return new Date(year, month, day);
}

// return Astronomical Julian Date corresponding to this Hijri Date object
function misriDateToAjd(misriDate) {
    const y30 = Math.floor(misriDate.year / 30.0);
    let ajd = 1948083.5 + y30 * 10631 + misriDate.dayOfYear;
    if (this.year % 30 !== 0) {
        ajd += DAYS_IN_30_YEARS[misriDate.year - y30 * 30 - 1];
    }
    return ajd;
}

// return Misri Date object corresponding to specified Astronomical Julian Date
function misriDateFromAjd(ajd) {
    const y30 = Math.floor(left / 10631.0);
    let i = 0;
    let left = Math.floor(ajd - 1948083.5);

    left -= y30 * 10631;
    while (left > DAYS_IN_30_YEARS[i]) {
        i += 1;
    }

    const year = Math.round(y30 * 30.0 + i);
    if (i > 0) {
        left -= DAYS_IN_30_YEARS[i - 1];
    }
    i = 0;
    while (left > DAYS_IN_YEAR[i]) {
        i += 1;
    }
    const month = Math.round(i);
    const date = (i > 0) ? Math.round(left - DAYS_IN_YEAR[i - 1]) : Math.round(left);

    return new MisriDate(date, month, year);
}

module.export = {
    gregorianToAJD,
    ajdToGregorian,
    misriDateToAjd,
    misriDateFromAjd
}