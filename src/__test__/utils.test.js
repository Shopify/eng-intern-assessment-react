import {getTimeString, formatTime} from '../utils'
describe('getTimeString', () => {
    test('returns a string of length 2', () => {
        const result = getTimeString(5);
        expect(result.length).toBe(2);
    });

    test('pads single digit numbers with a leading 0', () => {
        const result = getTimeString(3);
        expect(result).toBe('03');
    });

    test('does not pad two digit numbers', () => {
        const result = getTimeString(33);
        expect(result).toBe('33');
    });

    test('handles the number 0 correctly', () => {
        const result = getTimeString(0);
        expect(result).toBe('00');
    });
});

describe('formatTime', () => {
    test('formats milliseconds to HH:MM:SS,CC correctly', () => {
        expect(formatTime(3661020)).toBe('01:01:01,02');
    });

    test('handles 0 correctly', () => {
        expect(formatTime(0)).toBe('00:00:00,00');
    });

    test('handles times without hours correctly', () => {
        const ms = 61020;
        expect(formatTime(ms)).toBe('00:01:01,02');
    });

    test('handles times without minutes correctly', () => {
        expect(formatTime(1020)).toBe('00:00:01,02');
    });

    test('handles times without seconds correctly', () => {
        expect(formatTime(20)).toBe('00:00:00,02');
    });
    // All values will be set to 0 because the given value equals 10 days, exceeding the timer limit of 23:59:59,99
    test('handles large time values correctly', () => {
        expect(formatTime(864000000)).toBe('00:00:00,00');
    });
});