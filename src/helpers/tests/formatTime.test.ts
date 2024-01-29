import formatTime from "../formatTime";

describe("formatTime function", () => {
  it("should format time correctly", () => {
    expect(formatTime(0)).toBe("0:00:\n  00:\n  00");
    expect(formatTime(100)).toBe("0:00:\n  01:\n  00");
    expect(formatTime(1000)).toBe("0:00:\n  10:\n  00");
    expect(formatTime(60000)).toBe("0:10:\n  00:\n  00");
    expect(formatTime(3600000)).toBe("10:00:\n  00:\n  00");
    expect(formatTime(3723432)).toBe("10:20:\n  34:\n  32");
  });
});
