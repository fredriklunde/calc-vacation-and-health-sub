const { daysOfAYear, isLeapYear, calculateDayOfYear } = require("./calc");

describe("daysOfAYear", () => {
  it("correct year is returned", () => {
    const d = new Date(2018, 11, 24, 10, 33, 30, 0);
    expect(daysOfAYear(2019)).toBe(365);
  });
});

describe("calculateDayOfYear", () => {
  it("January 2nd returns 2", () => {
    const date = new Date(2018, 0, 2, 0, 0, 0, 1);
    expect(calculateDayOfYear(date)).toBe(2);
  });
  it("December 31st returns 365", () => {
    const date = new Date(2018, 11, 31, 0, 0, 0, 1);
    expect(calculateDayOfYear(date)).toBe(365);
  });
  it("December 31st returns 366 on leap year", () => {
    const date = new Date(2016, 11, 31, 0, 0, 0, 1);
    expect(calculateDayOfYear(date)).toBe(366);
  });
});
