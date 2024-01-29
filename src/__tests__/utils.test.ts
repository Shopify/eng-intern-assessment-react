import { getTimeBreakdown } from "../utils";

describe("tests getTimeBreakdown", () => {
  test("breaks down 60000ms to 1m", () => {
    const timeBreakdown = getTimeBreakdown(60000);

    expect(timeBreakdown.minutes).toBe("01");
    expect(timeBreakdown.seconds).toBe("00");
    expect(timeBreakdown.milliseconds).toBe("000");
  });

  test("breaks down 123ms to 123ms", () => {
    const timeBreakdown = getTimeBreakdown(123);

    expect(timeBreakdown.minutes).toBe("00");
    expect(timeBreakdown.seconds).toBe("00");
    expect(timeBreakdown.milliseconds).toBe("123");
  });

  test("breaks down 454150 ms to 07m 34s 150ms", () => {
    const timeBreakdown = getTimeBreakdown(454150);

    expect(timeBreakdown.minutes).toBe("07");
    expect(timeBreakdown.seconds).toBe("34");
    expect(timeBreakdown.milliseconds).toBe("150");
  });

  test("breaks down 3947050 ms to 65m 47s 50ms", () => {
    const timeBreakdown = getTimeBreakdown(3947050);

    expect(timeBreakdown.minutes).toBe("65");
    expect(timeBreakdown.seconds).toBe("47");
    expect(timeBreakdown.milliseconds).toBe("050");
  });

  test("breaks down 7200000 ms to 2 hours", () => {
    const timeBreakdown = getTimeBreakdown(7200000);

    expect(timeBreakdown.minutes).toBe("120");
    expect(timeBreakdown.seconds).toBe("00");
    expect(timeBreakdown.milliseconds).toBe("000");
  });
});
