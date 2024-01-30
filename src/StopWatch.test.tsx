import { formatTime } from './StopWatch';


// Test the formatTime function
describe('formatTime', () => {
  test('formats time less than an hour correctly', () => {
    expect(formatTime(5900)).toBe('0:00:59:00');
    expect(formatTime(6000)).toBe('0:01:00:00');
    expect(formatTime(359900)).toBe('0:59:59:00');
  });

  test('formats time greater than an hour correctly', () => {
    expect(formatTime(360000)).toBe('1:00:00:00');
    expect(formatTime(366100)).toBe('1:01:01:00');
  });
});
