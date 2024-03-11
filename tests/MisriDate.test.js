const MisriDate = require('..');

const data = [
    { "year": 1445, "month": 0, "date": 1 },
    { "year": 1445, "month": 13, "date": 1 },
    { "year": 1445, "month": 1, "date": 0 },
    { "year": 1445, "month": 1, "date": 31 },
    { "year": 1445, "month": 12, "date": 31 },
    { "year": 1445, "month": 12, "date": 0 },
    { "year": 1449, "month": 12, "date": 30 },
    { "year": 1449, "month": 12, "date": 0 },
    { "year": "1449", "month": 12, "date": 0 },
    { "year": 1449, "month": "12", "date": 0 },
    { "year": 1449, "month": 12, "date": "0" }
]

describe('Misri Date', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    it('should be created when year, month and date are passed', () => {
        const pehliMoharran1444H = new MisriDate(1444, 1, 1);

        expect(pehliMoharran1444H.date).toEqual(1);
        expect(pehliMoharran1444H.month).toEqual(1);
        expect(pehliMoharran1444H.year).toEqual(1444);
    });

    it('should be created with current date when no paramters are passed', () => {
        const pehliMoharran1444H = new MisriDate();

        expect(pehliMoharran1444H.date).toEqual(6);
        expect(pehliMoharran1444H.month).toEqual(5);
        expect(pehliMoharran1444H.year).toEqual(1441);
    });

    it.each(data)('should not be created when misri date passed is $year, $month, $date', (params) => {
        const { year, month, date } = params
        expect(() => new MisriDate(year, month, date)).toThrow('Pass valid arguments');
    });

    it('should no be created when only year is given', () => {
        expect(() => new MisriDate(1345)).toThrow('Pass valid arguments');
    });

    it('should no be created when only year and month is given', () => {
        expect(() => new MisriDate(1345, 1)).toThrow('Pass valid arguments');
    });
});