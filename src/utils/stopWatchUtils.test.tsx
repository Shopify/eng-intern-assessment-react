import { formatTime } from './stopWatchUtils';

test('formats time with hours, minutes, and seconds', () => {
    const time = 3665; // 1 hour, 1 minute, and 5 seconds
    const formattedTime = formatTime(time);
    expect(formattedTime).toBe('01:01:05');
});

test('formats time with minutes and seconds', () => {
    const time = 125; // 2 minutes and 5 seconds
    const formattedTime = formatTime(time);
    expect(formattedTime).toBe('00:02:05');
});