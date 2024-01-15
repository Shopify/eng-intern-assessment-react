import { getCurrentTime } from "../src/utils/utils";

describe("Testing getCurrentTime function", () => {
  test("should throw an error when input is not a number", () => {
    expect(() => getCurrentTime("not a number")).toThrow(
      "Invalid timer input"
    );
  });

  test("should return correct hours, minutes and seconds when input is valid", () => {
    const result = getCurrentTime(3665);
    expect(result.hours).toEqual(1);
    expect(result.minutes).toEqual(1);
    expect(result.seconds).toEqual(5);
  });
});
