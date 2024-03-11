const errorScenarios = [
    { year: 1445, month: 0, date: 1 },
    { year: 1445, month: 13, date: 1 },
    { year: 1445, month: 1, date: 0 },
    { year: 1445, month: 1, date: 31 },
    { year: 1445, month: 12, date: 31 },
    { year: 1445, month: 12, date: 0 },
    { year: 1449, month: 12, date: 30 },
    { year: 1449, month: 12, date: 0 },
    { year: "1449", month: 12, date: 0 },
    { year: 1449, month: "12", date: 0 },
    { year: 1449, month: 12, date: "0" }
]

const toStringScenarios = [
    { year: 1445, month: 1, date: 10, expected: "10 Moharram al-Haraam 1445H" },
    { year: 1446, month: 2, date: 10, expected: "10 Safar al-Muzaffar 1446H" },
    { year: 1447, month: 3, date: 10, expected: "10 Rabi al-Awwal 1447H" },
    { year: 1448, month: 4, date: 10, expected: "10 Rabi al-Aakhar 1448H" },
    { year: 1449, month: 5, date: 10, expected: "10 Jumada al-Ula 1449H" },
    { year: 1450, month: 6, date: 10, expected: "10 Jumada al-Ukhra 1450H" },
    { year: 1451, month: 7, date: 10, expected: "10 Rajab al-Asab 1451H" },
    { year: 1452, month: 8, date: 10, expected: "10 Shabaan al-Karim 1452H" },
    { year: 1453, month: 9, date: 10, expected: "10 Ramadaan al-Moazzam 1453H" },
    { year: 1454, month: 10, date: 10, expected: "10 Shawwal al-Mukarram 1454H" },
    { year: 1455, month: 11, date: 10, expected: "10 Zilqadah al-Haraam 1455H" },
    { year: 1456, month: 12, date: 10, expected: "10 Zilhaj al-Haraam 1456H" }
]

module.exports = {
    errorScenarios,
    toStringScenarios
}