import { getTimeDisplayValue, digitize, incrementTime } from "./util";

describe('util tests', () => {
    describe('getTimeDisplay tests', () => {
        it('getTimeDIsplayValue should produce the expected result for 0', () => {
            expect(getTimeDisplayValue(0)).toEqual('00:00:00.00');
        });

        it('getTimeDisplayValue should produce the expected result for 2510090', () => {
            expect(getTimeDisplayValue(2510090)).toEqual('00:41:50.09');
        });
    });

    describe ('digitize tests', () => {
        it('digitize should produce a leading zero when input number <10', () => {
            expect(digitize(5)).toEqual('05');
        });

        it('digitize should leave the digits alone when the value is 10', () => {
            expect(digitize(10)).toEqual('10');
        });

        it('digitize should leave the digits alone when the value is > 10', () => {
            expect(digitize(25)).toEqual('25');
        });
    });

    describe ('incrementTime tests', () => {
        it('should add 10 to the input time', () => {
            expect(incrementTime(20)).toEqual(30);
        });
    })
});