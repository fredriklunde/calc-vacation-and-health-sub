const healtCareSub = 5000;

export const getYearOfFirstVacationPeriod = function (startingDate) {
  let firstDayOfVacationYear = new Date(startingDate.getFullYear(), 3, 1);
  if (startingDate.getMonth() >= 3) {
    firstDayOfVacationYear = new Date(startingDate.getFullYear() + 1, 3, 1);
  }
  return firstDayOfVacationYear.getFullYear();
};

/*
Antalet betalda semesterdagar beräknas som: 
Antalet semesterdagar per år * antalet anställningsdagar aktuellt intjänandeår/ antal dagar på året 
(avrundas alltid uppåt till hela semesterdagar)
*/
export const calculateNumberOfVacationDays = function (
  startingDate,
  firstDayOfEarningYear,
  numberOfPaidVacationDays
) {
  const startingDateDayNumberOfEarningYear = Math.ceil(
    (startingDate - firstDayOfEarningYear) / 86400000
  );
  const numberOfDaysOfEarningYear = daysOfAYear(
    firstDayOfEarningYear.getFullYear() + 1
  );
  const numberOfDaysWorkedThisEarningYear =
    numberOfDaysOfEarningYear - startingDateDayNumberOfEarningYear;
  const numberOfVacationDays = Math.ceil(
    (numberOfDaysWorkedThisEarningYear * numberOfPaidVacationDays) /
      numberOfDaysOfEarningYear
  );
  if (numberOfVacationDays <= 0) {
    return 0;
  }
  return numberOfVacationDays;
};

export const calculateHealthCareSub = function (startingDate) {
  const dayOfYear = calculateDayOfYear(startingDate);
  const workingDaysThisYear = daysOfAYear(startingDate.getFullYear()) - dayOfYear + 1;
  const healtCareSubThisYear = Math.round(
    healtCareSub * (workingDaysThisYear / daysOfAYear(startingDate.getFullYear()))
  );
  return healtCareSubThisYear;
};

export const calculateNumberOfVacationDaysNextPeriod = function (
  startingDate,
  numberOfPaidVacationDays
) {
  var numberOfVacationNextPeriod;
  //the first day of the earning year is april 1st
  let firstDayOfEarningYear = new Date(startingDate.getFullYear() - 1, 3, 1);
  if (startingDate.getMonth() >= 3) {
    firstDayOfEarningYear = new Date(startingDate.getFullYear(), 3, 1);
  }
  /*
    Antalet betalda semesterdagar beräknas som: 
    Antalet semesterdagar per år * antalet anställningsdagar aktuellt intjänandeår/ antal dagar på året 
    (avrundas alltid uppåt till hela semesterdagar)
  */
  numberOfVacationNextPeriod = calculateNumberOfVacationDays(
    startingDate,
    firstDayOfEarningYear,
    numberOfPaidVacationDays
  );
  return numberOfVacationNextPeriod;
};

/*
Helper methods
*/

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

const daysOfAYear = function (year) {
  return isLeapYear(year) ? 366 : 365;
};

const calculateDayOfYear = function (startingDate) {
  return Math.ceil(
    (startingDate - new Date(startingDate.getFullYear(), 0, 1)) / 86400000
  );
};

module.exports = {
  daysOfAYear,
  isLeapYear,
  calculateDayOfYear,
  getYearOfFirstVacationPeriod,
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
};
