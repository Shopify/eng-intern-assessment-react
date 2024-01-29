import getWinningLaps from "../getWinningLaps";

describe("getWinningLaps function", () => {
  // NOTE: All laps arrays are ordered from most to least recent
  // Example: [3rd lap, 2nd lap, 1st lap]

  it("should return the correct winning laps for a set of laps", () => {
    const laps1 = [60, 65, 70, 55, 75];
    expect(getWinningLaps(laps1)).toEqual({ gold: 3, silver: 0, bronze: 1 });

    const laps2 = [50, 45, 55, 40, 60];
    expect(getWinningLaps(laps2)).toEqual({ gold: 3, silver: 1, bronze: 0 });

    const laps3 = [80, 85, 90, 75, 95];
    expect(getWinningLaps(laps3)).toEqual({ gold: 3, silver: 0, bronze: 1 });
  });

  it("should handle edge cases such as empty lap array", () => {
    expect(getWinningLaps([])).toEqual({
      gold: undefined,
      silver: undefined,
      bronze: undefined,
    });
  });

  it("should return only gold for one completed lap", () => {
    expect(getWinningLaps([55])).toEqual({
      gold: 0,
      silver: undefined,
      bronze: undefined,
    });
  });

  it("should return only gold and silver for two completed laps", () => {
    // 2nd lap < 1st lap, so 1st switches from gold to silver and 2nd gets gold
    expect(getWinningLaps([40, 55])).toEqual({
      gold: 0,
      silver: 1,
      bronze: undefined,
    });
  });

  it("should return most recent lap when there are laps of equal timestamps", () => {
    // 4th lap gets silver and 1st lap gets bronze (skip over 3rd since its time is equal to 4th)
    expect(getWinningLaps([55, 55, 40, 75])).toEqual({
      gold: 2,
      silver: 0,
      bronze: 3,
    });
  });
});
