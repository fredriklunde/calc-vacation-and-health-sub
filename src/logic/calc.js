const defaultNumberOfPaidVacationDays = 25;
const healtCareSub = 5000;

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

const daysOfAYear = function (year) {
  return isLeapYear(year) ? 366 : 365;
};

const calculateDayOfYear = function (date) {
  return Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / 86400000);
};

/*
Antalet betalda semesterdagar beräknas som: 
Antalet semesterdagar per år * antalet anställningsdagar aktuellt intjänandeår/ antal dagar på året 
(avrundas alltid uppåt till hela semesterdagar)
*/
export const calculateNumberOfVacationDays = function (
  startingDate,
  firstDayOfEarningYear
) {
  const startingDateDayNumberOfEarningYear = Math.ceil(
    (startingDate - firstDayOfEarningYear) / 86400000
  );
  const numberOfDaysOfEarningYear = daysOfAYear(
    firstDayOfEarningYear.getFullYear() + 1
  );
  const numberOfDaysWorkedThisEarningYear =
    numberOfDaysOfEarningYear - startingDateDayNumberOfEarningYear + 1;
  const numberOfVacationDays = Math.ceil(
    (numberOfDaysWorkedThisEarningYear * defaultNumberOfPaidVacationDays) /
      numberOfDaysOfEarningYear
  );
  if (numberOfVacationDays <= 0) {
    return 0;
  }
  return numberOfVacationDays;
};

export const calculateHealthCareSub = function (date) {
  const dayOfYear = calculateDayOfYear(date);
  const workingDaysThisYear = daysOfAYear(date) - dayOfYear;
  const healtCareSubThisYear = Math.round(
    healtCareSub * (workingDaysThisYear / daysOfAYear(date))
  );
  return healtCareSubThisYear;
};

export const calculateNumberOfVacationDaysNextPeriod = function (startingDate) {
  var numberOfVacationDays = 25;
  //the first day of the earning year is april 1st
  let firstDayOfEarningYear = new Date(new Date().getFullYear() - 1, 3, 1);
  if (new Date().getMonth() >= 3) {
    firstDayOfEarningYear = new Date(new Date().getFullYear(), 3, 1);
  }
  /*
  If having started before the first day of the current earning year, we can assume that
  the employee will have full vacation
  */
  if (startingDate < firstDayOfEarningYear) {
    return numberOfVacationDays;
  }
  /*
    Antalet betalda semesterdagar beräknas som: 
    Antalet semesterdagar per år * antalet anställningsdagar aktuellt intjänandeår/ antal dagar på året 
    (avrundas alltid uppåt till hela semesterdagar)
  */
  numberOfVacationDays = calculateNumberOfVacationDays(
    startingDate,
    firstDayOfEarningYear
  );
  return numberOfVacationDays;
};
