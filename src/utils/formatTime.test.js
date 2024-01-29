import { formatTime } from "./formatTime";

describe("formatTime", () => {
    // each unit of time is 10ms
    test('0ms should be 00:00.00', () => { 
        expect(formatTime(0)).toBe('00:00.00')
    })

    test('365130 ms should be 06:05.13', () => { 
        expect(formatTime(36513)).toBe('06:05.13')
    })

    test('3600000 should be 01:00:00.00', () => { 
        expect(formatTime(360000)).toBe('01:00:00.00')
    })

    test('negative time should return empty string', () => { 
        expect(formatTime(-50)).toBe('')
    })
});