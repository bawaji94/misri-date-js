const MisriDate = require('..');

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

    it('should throw an error when all parameters are not passed', () => {
        expect(() => new MisriDate(1)).toThrow('Pass valid arguments');
    });
});