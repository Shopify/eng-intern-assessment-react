import { durationToString } from "../time"

describe("durationToString", () => {
  test("converts duration to string", () => {
    expect(durationToString(0)).toBe("00:00:00.000")
    expect(durationToString(1)).toBe("00:00:00.001")
    expect(durationToString(1000)).toBe("00:00:01.000")
    expect(durationToString(10000)).toBe("00:00:10.000")
    expect(durationToString(60000)).toBe("00:01:00.000")
    expect(durationToString(600000)).toBe("00:10:00.000")
    expect(durationToString(3600000)).toBe("01:00:00.000")
    expect(durationToString(36000000)).toBe("10:00:00.000")
    expect(durationToString(360000000)).toBe("100:00:00.000")
    expect(durationToString(3600000000)).toBe("1000:00:00.000")
  })
})
