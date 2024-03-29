const MisriDate = require('..');
const { errorScenarios, toStringScenarios} = require('./misriDateTestTables');

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

    it.each(errorScenarios)('should not be created when misri date passed is $year, $month, $date', (params) => {
        const { year, month, date } = params
        expect(() => new MisriDate(year, month, date)).toThrow('Pass valid arguments');
    });

    it('should no be created when only year is given', () => {
        expect(() => new MisriDate(1345)).toThrow('Pass valid arguments');
    });

    it('should no be created when only year and month is given', () => {
        expect(() => new MisriDate(1345, 1)).toThrow('Pass valid arguments');
    });

    it.each(toStringScenarios)('should stringify Misri Date of value $date/$month/$year to $expected', (row) => {
        const { year, month, date, expected } = row;

        expect(`${new MisriDate(year, month, date)}`).toEqual(expected);
    });

    describe('from Gregorian Date', () => {
        it('should create misri date given greorian date', () => {
            const date = new Date(1997, 9, 29);

            const misriDate = MisriDate.fromGregorian(date);

            expect(misriDate.date).toEqual(28);
            expect(misriDate.month).toEqual(6);
            expect(misriDate.year).toEqual(1418);
        });

        it('should create misri date given julian date', () => {
            const date = new Date(1580, 9, 29);

            const misriDate = MisriDate.fromGregorian(date);

            expect(misriDate.date).toEqual(21);
            expect(misriDate.month).toEqual(9);
            expect(misriDate.year).toEqual(988);
        });

        it('should create misri date given gregorian date December 31 621', () => {
            const date = new Date(621, 11, 31);

            const misriDate = MisriDate.fromGregorian(date);

            expect(misriDate.date).toEqual(11);
            expect(misriDate.month).toEqual(6);
            expect(misriDate.year).toEqual(0);
        });

        it('should create misri date given gregorian date August 04 621', () => {
            const date = new Date(621, 7, 4);

            const misriDate = MisriDate.fromGregorian(date);

            expect(misriDate.date).toEqual(10);
            expect(misriDate.month).toEqual(1);
            expect(misriDate.year).toEqual(0);
        });

        it('should not create misri date when date is not given', () => {
            expect(() => MisriDate.fromGregorian("1234")).toThrow("parameter should be of type Date");
        });
    });

    describe('to Gregorian Date', () => {
        it('should create Date from misri Date', () => {
            const misriDate = new MisriDate(1418, 6, 28);

            expect(misriDate.gregorianDate).toEqual(new Date(1997, 9, 29));
        });

        it('should create Date from ashura 1445H', () => {
            const misriDate = new MisriDate(1445, 1, 10);

            expect(misriDate.gregorianDate).toEqual(new Date(2023, 6, 27));
        });

        it('should create Date from ashura 1440H', () => {
            const misriDate = new MisriDate(1440, 1, 10);

            expect(misriDate.gregorianDate).toEqual(new Date(2018, 8, 20));
        });

        it('should create Date from ashura 988H', () => {
            const misriDate = new MisriDate(988, 1, 10);

            expect(misriDate.gregorianDate).toEqual(new Date(1580, 1, 25));
        });
    });

    describe('Equating', () => {
        it('should not equate misri date with Date object', () => {
            const ashura1445H = new MisriDate(1445, 1, 10);

            expect(ashura1445H.equals("4")).toEqual(false);
        });

        it('should equate ashura 1445H with itself', () => {
            const ashura1445H = new MisriDate(1445, 1, 10);

            expect(ashura1445H.equals(ashura1445H)).toEqual(true);
        });

        it('should equate misri date with another object of same value', () => {
            const misriDate = new MisriDate(1445, 1, 10);
            const anotherMisriDate = new MisriDate(1445, 1, 10);

            expect(misriDate.equals(anotherMisriDate)).toEqual(true);
        });

        it('should not equate ashura 1445H with ashura 1444H', () => {
            const ashura1445H = new MisriDate(1445, 1, 10);
            const ashura1444H = new MisriDate(1444, 1, 10);

            expect(ashura1445H.equals(ashura1444H)).toEqual(false);
        });

        it('should not equate ashura 1445H with taasu 1444H', () => {
            const ashura1445H = new MisriDate(1445, 1, 10);
            const taasu1444H = new MisriDate(1444, 1, 9);

            expect(ashura1445H.equals(taasu1444H)).toEqual(false);
        });

        it('should not equate eid-ul-fitr 1445H with nawu waras 1445H', () => {
            const nawuWaras1445H = new MisriDate(1445, 1, 1);
            const eidUlFitr1445H = new MisriDate(1444, 10, 1);

            expect(nawuWaras1445H.equals(eidUlFitr1445H)).toEqual(false);
        });
    });

    describe('Compare', () => {
        it('should not compare misri date with anything else', () => {
            const misriDate = new MisriDate(1445, 1, 1);
            expect(() => misriDate.compare("4")).toThrow("Misri Date must be compared with Misri Date")
        });

        it('should equate misri date with another object of same value', () => {
            const misriDate = new MisriDate(1445, 1, 1);
            const anotherMisriDate = new MisriDate(1445, 1, 1);
            expect(misriDate.compare(anotherMisriDate)).toEqual(0)
        });

        it('should return -1 when earlier misri date is compared with latest date', () => {
            const earlierMisriDate = new MisriDate(1445, 1, 1);
            const laterMisriDate = new MisriDate(1445, 9, 12);
            expect(earlierMisriDate.compare(laterMisriDate)).toEqual(-1)
        });

        it('should return 1 when later misri date is compared with earlier date', () => {
            const earlierMisriDate = new MisriDate(1445, 1, 1);
            const laterMisriDate = new MisriDate(1445, 9, 12);
            expect(laterMisriDate.compare(earlierMisriDate)).toEqual(1)
        });
    });
});