import React from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import {
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
  calculateNumberOfVacationDaysThisPeriod,
} from "../logic/calc";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      healtCareSubThisYear: 0,
      vacationDaysNextPeriod: 0,
      vacationDaysThisPeriod: 0,
      message: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  setHealthCareSub(date) {
    if (date.getFullYear() < new Date().getFullYear()) {
      this.setState({
        healtCareSubThisYear: 5000,
        message:
          "Eftersom du började förra året så har du fullt friskvårdsbidrag i år.",
      });
    } else {
      this.setState({
        healtCareSubThisYear: calculateHealthCareSub(date),
        message: "Baserat på antal dagar du kommer att jobba i år.",
      });
    }
  }

  setVactationDays(startingDate) {
    this.setState({
      vacationDaysNextPeriod:
        calculateNumberOfVacationDaysNextPeriod(startingDate),
    });
    this.setState({
      vacationDaysThisPeriod:
        calculateNumberOfVacationDaysThisPeriod(startingDate),
    });
  }

  onDateChange(date) {
    if (!date) {
      return;
    }
    this.setState({
      startDate: date,
    });
    this.setHealthCareSub(date);
    this.setVactationDays(date);
  }

  renderMessage() {
    if (this.state.message) {
      return <h5 className="ui info message">{this.state.message}</h5>;
    }
  }

  render() {
    function getYearOfNextVacationPeriod() {
      let firstDayOfVacationYear = new Date(new Date().getFullYear(), 3, 1);
      if (new Date().getMonth() >= 3) {
        firstDayOfVacationYear = new Date(new Date().getFullYear() + 1, 3, 1);
      }
      return firstDayOfVacationYear.getFullYear();
    }

    function getYearOfThisVacationPeriod() {
      let firstDayOfVacationYear = new Date(new Date().getFullYear() - 1, 3, 1);
      if (new Date().getMonth() >= 3) {
        firstDayOfVacationYear = new Date(new Date().getFullYear(), 3, 1);
      }
      return firstDayOfVacationYear.getFullYear();
    }

    return (
      <div className="ui container">
        <h1 className="ui header">Friskvårdsbidragsuträknare</h1>
        <div className="sub header">
          Välj ett startdatum för att räkna ut hur mycket Friskvårdsbidrag du är
          berättigad till i år.
        </div>
        <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <DatePicker
            onChange={this.onDateChange}
            value={this.state.startDate}
          />
        </div>
          <div>
            Start Date:{" "}
            {this.state.startDate
              ? moment(this.state.startDate).format("YYYY-MM-DD")
              : ""}
          </div>
          <div>
            Friskvårdsbidrag: {this.state.healtCareSubThisYear}
          </div>
          <div>
            Semester period 1/4/{getYearOfThisVacationPeriod()}-31/3/
            {getYearOfThisVacationPeriod() + 1}:{" "}
            {this.state.vacationDaysThisPeriod}
          </div>
          <div>
            Semester period 1/4/{getYearOfNextVacationPeriod()}-31/3/
            {getYearOfNextVacationPeriod() + 1}:{" "}
            {this.state.vacationDaysNextPeriod}
          </div>
        {this.renderMessage()}
      </div>
    );
  }
}

export default App;
