import { formatTime } from "../src/utils";

describe("formatTime", () => {
  test("formats time correctly for one hour", () => {
    const result = formatTime(3600); // 1 hour in seconds
    expect(result).toBe("01:00:00");
  });

  test("formats time correctly for one minute", () => {
    const result = formatTime(60); // 1 minute in seconds
    expect(result).toBe("00:01:00");
  });

  test("formats time correctly for one second", () => {
    const result = formatTime(1); // 1 second
    expect(result).toBe("00:00:01");
  });

  test("formats time correctly for a custom time", () => {
    const result = formatTime(3665); // 1 hour, 1 minute, and 5 seconds
    expect(result).toBe("01:01:05");
  });

  test("formats time correctly for zero seconds", () => {
    const result = formatTime(0);
    expect(result).toBe("00:00:00");
  });
});
