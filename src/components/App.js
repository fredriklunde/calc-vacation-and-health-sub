import React from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import {
  Container,
  Header,
  Input,
  Divider,
  Icon,
  Grid,
  Segment,
} from "semantic-ui-react";

import {
  getYearOfFirstVacationPeriod,
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
} from "../logic/calc";

const square = { width: 175, height: 175 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingDate: null,
      numberOfPaidVacationDays: 25,
      healtCareSubThisYear: 0,
      vacationDaysNextPeriod: 0,
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
    if (this.state.startingDate) {
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
      <Container text style={{ margin: 20 }}>
        <Header as="h1">Friskvårdsbidragsuträknare</Header>
        <p>
          Applikationen räknar ut hur mycket semester du hinner jobba in till
          nästa semesterår, samt hur mycket Friskvårdsbidrag du har rätt till
          under kalenderåret du blev anställd.
        </p>
        <Header as="h5">Välj startdatum</Header>
        <DatePicker
          onChange={this.onDateChange}
          value={this.state.startingDate}
        />
        <Header as="h5">Antal semesterdagar</Header>
        <Input
          label={{ basic: true, content: "Dagar" }}
          labelPosition="right"
          type="number"
          size="mini"
          value={this.state.numberOfPaidVacationDays}
          name="quantity"
          min="25"
          placeholder={this.state.numberOfPaidVacationDays}
          onChange={this.onNumberOfPaidVacationDaysChange}
        />
        <Divider />
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

        <Grid container columns={3}>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h2">
                Startdatum!
                <Header.Subheader>
                  {" "}
                  {this.state.startingDate
                    ? moment(this.state.startingDate).format("YYYY-MM-DD")
                    : ""}
                </Header.Subheader>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h2">
                Friskvårdsbidrag
                <Header.Subheader>
                  {" "}
                  {this.state.startingDate
                    ? moment(this.state.startingDate).format("YYYY")
                    : ""}
                  : {this.state.healtCareSubThisYear}
                </Header.Subheader>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h2">
                Semesterdagar
                <Header.Subheader>
                  {" "}
                  {this.renderVacationDaysText()}
                </Header.Subheader>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;
