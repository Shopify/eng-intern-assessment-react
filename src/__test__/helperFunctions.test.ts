import "@testing-library/jest-dom";
import { formatTime, getMilliseconds, getSeconds, getMinutes } from "../helperFunctions";

test('formatTime function formats time correctly', () => {
    const formattedTime = formatTime(123456);
    expect(formattedTime).toBe('02:03.45');
});

test('getMilliseconds returns correct value', () => {
    const milliseconds = getMilliseconds(1234);
    expect(milliseconds).toBe(234);
});

test('getSeconds returns correct value', () => {
    const seconds = getSeconds(12345);
    expect(seconds).toBe(12);
});

test('getMinutes returns correct value', () => {
    const minutes = getMinutes(1234567);
    expect(minutes).toBe(20);
});
