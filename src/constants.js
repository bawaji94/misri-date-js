const QARN_SAGIR = [2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29];

const DAYS_IN_YEAR = [30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325];

const DAYS_IN_30_YEARS = [
   354,  708, 1063, 1417, 1771, 2126, 2480, 2834,  3189,  3543,
  3898, 4252, 4606, 4961, 5315, 5669, 6024, 6378,  6732,  7087,
  7441, 7796, 8150, 8504, 8859, 9213, 9567, 9922, 10276, 10631
];

const MONTHS = [
    {
        en: "Moharram al-Haraam",
        days: 30
    },
    {
        en: "Safar al-Muzaffar",
        days: 29
    },
    {
        en: "Rabi al-Awwal",
        days: 30
    },
    {
        en: "Rabi al-Aakhar",
        days: 29
    },
    {
        en: "Jumada al-Ula",
        days: 30
    },
    {
        en: "Jumada al-Ukhra",
        days: 29
    },
    {
        en: "Rajab al-Asab",
        days: 30
    },
    {
        en: "Shabaan al-Karim",
        days: 29
    },
    {
        en: "Ramadaan al-Moazzam",
        days: 30
    },
    {
        en: "Shawwal al-Mukarram",
        days: 29
    },
    {
        en: "Zilqadah al-Haraam",
        days: 30
    },
    {
        en: "Zilhaj al-Haraam",
        days: 29
    }
];

module.exports = {
    QARN_SAGIR,
    DAYS_IN_YEAR,
    DAYS_IN_30_YEARS,
    MONTHS
}