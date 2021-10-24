import React from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import {
  getYearOfFirstVacationPeriod,
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
} from "../logic/calc";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingDate: null,
      healtCareSubThisYear: 0,
      vacationDaysNextPeriod: 0,
      vacationDaysThisPeriod: 0,
      message: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  setHealthCareSub(startingDate) {
    this.setState({
      healtCareSubThisYear: calculateHealthCareSub(startingDate),
    });
  }

  setVactationDays(startingDate) {
    this.setState({
      vacationDaysNextPeriod:
        calculateNumberOfVacationDaysNextPeriod(startingDate),
    });
  }

  onDateChange(startingDate) {
    if (!startingDate) {
      return;
    }
    this.setState({
      startingDate: startingDate,
    });
    this.setHealthCareSub(startingDate);
    this.setVactationDays(startingDate);
  }

  renderMessage() {
    if (this.state.message) {
      return <h5 className="ui info message">{this.state.message}</h5>;
    }
  }

  renderVacationDaysText() {
    if (this.state.startingDate) {
      const yearOfFirstVacationYear = getYearOfFirstVacationPeriod(
        this.state.startingDate
      );
      return (
        <div>
          Intjänade semesterdagar period 1/4/{yearOfFirstVacationYear} - 31/3/
          {yearOfFirstVacationYear + 1}: {this.state.vacationDaysNextPeriod}
        </div>
      );
    }
  }

  render() {
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
            value={this.state.startingDate}
          />
        </div>
        <div>
          Starting Date:{" "}
          {this.state.startingDate
            ? moment(this.state.startingDate).format("YYYY-MM-DD")
            : ""}
        </div>
        <div>
          Friskvårdsbidrag{" "}
          {this.state.startingDate
            ? moment(this.state.startingDate).format("YYYY")
            : ""}
          : {this.state.healtCareSubThisYear}
        </div>
        {this.renderVacationDaysText()}
        {this.renderMessage()}
      </div>
    );
  }
}

export default App;
