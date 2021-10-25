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
      numberOfPaidVacationDays: 25,
      healtCareSubThisYear: 0,
      vacationDaysNextPeriod: 0,
      vacationDaysThisPeriod: 0,
      message: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onNumberOfPaidVacationDaysChange =
      this.onNumberOfPaidVacationDaysChange.bind(this);
  }

  setHealthCareSub(startingDate) {
    this.setState({
      healtCareSubThisYear: calculateHealthCareSub(startingDate),
    });
  }

  setVactationDays(startingDate) {
    this.setState({
      vacationDaysNextPeriod: calculateNumberOfVacationDaysNextPeriod(
        startingDate,
        this.state.numberOfPaidVacationDays
      ),
    });
  }

  setMessage(message) {
    this.setState({
      message: message,
    });
  }

  onNumberOfPaidVacationDaysChange(e) {
    this.setState({
      numberOfPaidVacationDays: e.target.value,
    });
    if(this.state.startingDate){
      this.setVactationDays(this.state.startingDate);
    }
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
    this.setMessage(
      `Framtida år / perioder kommer att vara berättigade fullt bidrag och fullt antal semesterdagar.`
    );
  }

  renderMessage() {
    if (this.state.message) {
      return <p className="ui info message">{this.state.message}</p>;
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
          Applikationen räknar ut hur mycket semester du hinner jobba in till
          nästa semesterår, samt hur mycket Friskvårdsbidrag du har rätt till
          under kalenderåret du blev anställd.
        </div>
        <h5 className="ui header">Antal semesterdagar</h5>
        <div className="ui right labeled input">
          <input
            type="number"
            value={this.state.numberOfPaidVacationDays}
            name="quantity" min="25"
            placeholder={this.state.numberOfPaidVacationDays}
            onChange={this.onNumberOfPaidVacationDaysChange}
          />
          <div className="ui basic label">Dagar</div>
        </div>

        <h5 className="ui header">Välj startdatum</h5>
        <div style={{ paddingBottom: "30px" }}>
          <DatePicker
            onChange={this.onDateChange}
            value={this.state.startingDate}
          />
        </div>
        <div>
          Startdatum:{" "}
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
