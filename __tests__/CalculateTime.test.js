import { CalculateTime } from "../src/utils/CalculateTime";

// Test suite to test the CalculateTime function, which takes in a time in milliseconds and returns a formatted time string
describe("CalculateTime", () => {
  it("should return the correct formatted time when given time in milliseconds", () => {
    expect(CalculateTime(3723404)).toBe("01:02:03.40");
    expect(CalculateTime(30500)).toBe("00:30.50");
    expect(CalculateTime(100)).toBe("00:00.10");
    expect(CalculateTime(0)).toBe("00:00.00");
  });
});
