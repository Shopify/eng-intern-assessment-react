import functions from "../src/functions";

describe("Test getTimeComponents", () => {
  test("0", () => {
    expect(functions.getTimeComponents(0)).toEqual(["", "00", "00", "00", "00"]);
  });

  test("-1 should become positive", () => {
    expect(functions.getTimeComponents(-1)).toEqual(["-", "00", "00", "00", "01"]);
  });

  test("1", () => {
    expect(functions.getTimeComponents(1)).toEqual(["", "00", "00", "00", "01"]);
  });

  test("10", () => {
    expect(functions.getTimeComponents(10)).toEqual(["", "00", "00", "00", "10"]);
  });

  test("100", () => {
    expect(functions.getTimeComponents(100)).toEqual(["", "00", "00", "01", "00"]);
  });

  test("6000", () => {
    expect(functions.getTimeComponents(6000)).toEqual(["", "00", "01", "00", "00"]);
  });

  test("360000", () => {
    expect(functions.getTimeComponents(360000)).toEqual(["", "01", "00", "00", "00"]);
  });

  test("36000000", () => {
    expect(functions.getTimeComponents(36000000)).toEqual(["", "100", "00", "00", "00"]);
  });

  test("36000000000000", () => {
    expect(functions.getTimeComponents(36000000000000)).toEqual([
      "",
      "100000000",
      "00",
      "00",
      "00",
    ]);
  });
});

describe("Test timeToString", () => {
  test("0", () => {
    expect(functions.timeToString(0)).toEqual("00:00.00");
  });

  test("1", () => {
    expect(functions.timeToString(1)).toEqual("00:00.01");
  });

  test("10", () => {
    expect(functions.timeToString(10)).toEqual("00:00.10");
  });

  test("100", () => {
    expect(functions.timeToString(100)).toEqual("00:01.00");
  });

  test("6000", () => {
    expect(functions.timeToString(6000)).toEqual("01:00.00");
  });

  test("360000", () => {
    expect(functions.timeToString(360000)).toEqual("01:00:00.00");
  });

  test("36000000", () => {
    expect(functions.timeToString(36000000)).toEqual("100:00:00.00");
  });
});
