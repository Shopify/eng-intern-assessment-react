import { formatTime } from "../lib/util";

test("formatTime renders 0ms correctly", () => {
  expect(formatTime(0)).toBe("00:00.00");
});

test("formatTime renders 10ms correctly", () => {
  expect(formatTime(10)).toBe("00:00.01");
});

test("formatTime renders 100ms correctly", () => {
  expect(formatTime(100)).toBe("00:00.10");
});

test("formatTime renders 1s correctly", () => {
  expect(formatTime(1000)).toBe("00:01.00");
});

test("formatTime renders 1m correctly", () => {
  expect(formatTime(60 * 1000)).toBe("01:00.00");
});

test("formatTime renders 1m 10s 10ms correctly", () => {
  expect(
    formatTime(
      60 * 1000 + // 1m
        1 * 1000 + // 1s
        10 // 10ms
    )
  ).toBe("01:01.01");
});

test("formatTime renders 500m correctly", () => {
  expect(formatTime(500 * 60 * 1000)).toBe("500:00.00");
});
