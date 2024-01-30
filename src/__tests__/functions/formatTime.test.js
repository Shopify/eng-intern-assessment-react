import { formatTime } from "../../StopWatch";

describe("formatTime", () => {
  it("formats time correctly for a variety of inputs", () => {
    // Basic cases
    expect(formatTime(0)).toBe("0:00:00:00");
    expect(formatTime(100)).toBe("0:00:01:00");
    expect(formatTime(6000)).toBe("0:01:00:00");
    expect(formatTime(360000)).toBe("1:00:00:00");

    // Arbitrary values
    expect(formatTime(12345)).toBe("0:02:03:45");
    expect(formatTime(1234567)).toBe("3:25:45:67");

    // Edge cases and extremes
    expect(formatTime(86399999)).toBe("239:59:59:99");
    expect(formatTime(86400000)).toBe("240:00:00:00");

    // Fractional milliseconds
    expect(formatTime(1.5)).toBe("0:00:00:1.5");
    expect(formatTime(1.6)).toBe("0:00:00:1.6");

    // Very large values
    expect(formatTime(359999999)).toBe("999:59:59:99");
    expect(formatTime(360000000)).toBe("1000:00:00:00");

    // Non-integer values
    expect(formatTime("6000")).toBe("0:01:00:00");
    expect(formatTime(null)).toBe("0:00:00:00");
    expect(formatTime(undefined)).toBe("NaN:NaN:NaN:NaN");
  });
});
