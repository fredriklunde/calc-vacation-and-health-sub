const defaultNumberOfPaidVacationDays = 25;


function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

export const daysOfAYear = function (year) {
  return isLeapYear(year) ? 366 : 365;
};

export const calculateDayOfYear = function (date) {
  return Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / 86400000);
};

export const calculateNumberOfVacationDays = function(startingDate, firstDayOfEarningYear) {
    /*
      Antalet betalda semesterdagar beräknas som: 
      Antalet semesterdagar per år * antalet anställningsdagar aktuellt intjänandeår/ antal dagar på året 
      (avrundas alltid uppåt till hela semesterdagar)
    */
    const startingDateDayNumberOfEarningYear = Math.ceil(
      (startingDate - firstDayOfEarningYear) / 86400000
    );
    const numberOfDaysOfEarningYear = daysOfAYear(
      firstDayOfEarningYear.getFullYear() + 1
    );
    const numberOfDaysWorkedThisEarningYear =
      numberOfDaysOfEarningYear - startingDateDayNumberOfEarningYear + 1;
    const numberOfVacationDays = Math.ceil(
      (numberOfDaysWorkedThisEarningYear *
        defaultNumberOfPaidVacationDays) /
        numberOfDaysOfEarningYear
    );
    if (numberOfVacationDays <= 0) {
      return 0;
    }
    return numberOfVacationDays;
  }
