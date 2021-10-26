const {
  getYearOfFirstVacationPeriod,
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
  daysOfAYear,
  isLeapYear,
  calculateDayOfYear,
} = require("./calc");

describe("isLeapYear", () => {
  it("2019 returns false", () => {
    expect(isLeapYear(2019)).toBe(false);
  });
  it("2016 returns true", () => {
    expect(isLeapYear(2016)).toBe(true);
  });
});

describe("daysOfAYear", () => {
  it("2019 returns 365", () => {
    expect(daysOfAYear(2019)).toBe(365);
  });
  it("2016 returns 366", () => {
    expect(daysOfAYear(2016)).toBe(366);
  });
});

describe("calculateDayOfYear", () => {
  it("January 2nd returns 2", () => {
    const date = new Date("2018-01-02T13:24:00");
    expect(calculateDayOfYear(date)).toBe(2);
  });
  it("December 31st returns 365", () => {
    const date = new Date("2018-12-31T13:24:00");
    expect(calculateDayOfYear(date)).toBe(365);
  });
  it("December 31st returns 366 on leap year", () => {
    const date = new Date("2016-12-31T13:24:00");
    expect(calculateDayOfYear(date)).toBe(366);
  });
});

describe("getYearOfFirstVacationPeriod", () => {
  it("2018-01-02 returns 2018", () => {
    const date = new Date("2018-01-02T13:24:00");
    expect(getYearOfFirstVacationPeriod(date)).toBe(2018);
  });
});

describe("calculateHealthCareSub", () => {
  it("2018-01-02 returns 4986", () => {
    const date = new Date("2018-01-02T13:24:00");
    console.log(date);
    expect(calculateHealthCareSub(date)).toBe(4986);
  });
  it("2018-12-01 returns 425", () => {
    const date = new Date("2018-12-01T13:24:00");
    console.log(date);
    expect(calculateHealthCareSub(date)).toBe(425);
  });
});

describe("calculateNumberOfVacationDaysNextPeriod", () => {
  it("2018-01-01 returns 7", () => {
    const date = new Date("2018-01-01T13:24:00");
    expect(calculateNumberOfVacationDaysNextPeriod(date, 25)).toBe(7);
  });
  it("2018-12-01 returns 9", () => {
    const date = new Date("2018-12-01T13:24:00");
    expect(calculateNumberOfVacationDaysNextPeriod(date, 25)).toBe(9);
  });
  it("2018-04-01 returns 25", () => {
    const date = new Date("2018-04-01T13:24:00");
    expect(calculateNumberOfVacationDaysNextPeriod(date, 25)).toBe(25);
  });
});
