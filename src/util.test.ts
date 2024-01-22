import { formatTime } from './util';

describe('Test cases for the formatTime helper method', () => {
    it('should format elapsed time correctly', () => {
        // Note: (1 * 60 * 60 + 10 * 60 + 20) * 1000 + 300
        const result = formatTime(4_220_300);
        expect(result).toBe('1:10:20:30');
    });

    it('should format elapsed time correctly with front padding', () => {
        // Note: (7 * 60 + 8) * 1000 + 20
        const result = formatTime(428_020);
        expect(result).toBe('0:07:08:02');
    });

    it('should format elapsed time correctly on the hour', () => {
        // Note: 1 * 60 * 60 * 1000
        const result = formatTime(3_600_000);
        expect(result).toBe('1:00:00:00');
    });

    it('should format elapsed time for zero', () => {
        // Note: 1 * 60 * 60 * 1000
        const result = formatTime(0);
        expect(result).toBe('0:00:00:00');
    });
});
