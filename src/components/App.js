import React, { useState } from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import {
  Container,
  Header,
  Input,
  Divider,
  Grid,
  Segment,
  Icon,
} from "semantic-ui-react";

import {
  getYearOfFirstVacationPeriod,
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
} from "../logic/calc";

const square = { width: 200, height: 200 };

function App() {
  const [startingDate, setStartingDate] = useState(null);
  const [numberOfPaidVacationDays, setNumberOfPaidVacationDays] = useState(25);
  const [healtCareSubThisYear, setHealtCareSubThisYear] = useState(0);
  const [vacationDaysNextPeriod, setVacationDaysNextPeriod] = useState(0);
  const [message, setMessage] = useState(null);

  const setHealthCareSub = (startingDate) => {
    const healtCareSubThisYear = calculateHealthCareSub(startingDate);
    setHealtCareSubThisYear(healtCareSubThisYear);
  };

  const setVactationDays = (startingDate) => {
    const vacationDaysNextPeriod = calculateNumberOfVacationDaysNextPeriod(
      startingDate,
      numberOfPaidVacationDays
    );
    setVacationDaysNextPeriod(vacationDaysNextPeriod);
  };

  const onNumberOfPaidVacationDaysChange = (e) => {
    setNumberOfPaidVacationDays(e.target.value);
    if (startingDate) {
      setVactationDays(startingDate);
    }
  };

  const onDateChange = (startingDate) => {
    if (!startingDate) {
      return;
    }
    setStartingDate(startingDate);
    setHealthCareSub(startingDate);
    setVactationDays(startingDate);
    setMessage(
      `Framtida år / perioder kommer att vara berättigade fullt bidrag och fullt antal semesterdagar.`
    );
  };

  const renderMessage = () => {
    if (message) {
      return <p className="ui info message">{message}</p>;
    }
  };

  const renderVacationDaysText = () => {
    if (startingDate) {
      const yearOfFirstVacationYear =
        getYearOfFirstVacationPeriod(startingDate);
      return (
        <Header as="h4" textAlign="center">
          Intjänade semesterdagar period 1/4/{yearOfFirstVacationYear} - 31/3/
          {yearOfFirstVacationYear + 1}
        </Header>
      );
    }
  };

  const renderInfoBlobs = () => {
    if (startingDate) {
      return (
        <Grid stackable columns={3}>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h3" icon>
                <Icon name="angle right" />
                Startdatum!
                <Header.Subheader>
                  {moment(startingDate).format("YYYY-MM-DD")}
                </Header.Subheader>
              </Header>
            </Segment>
            <Header as="h4" textAlign="center">
              Beräkningen baseras på ditt startdatum
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h3" icon>
                <Icon name="heart" />
                Friskvårdsbidrag
                <Header.Subheader>{healtCareSubThisYear}</Header.Subheader>
              </Header>
            </Segment>
            <Header as="h4" textAlign="center">
              Friskvårdsbidrag {moment(startingDate).format("YYYY")}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h3" icon>
                <Icon name="sun" />
                Semesterdagar
                <Header.Subheader>{vacationDaysNextPeriod}</Header.Subheader>
              </Header>
            </Segment>
            {renderVacationDaysText()}
          </Grid.Column>
        </Grid>
      );
    }
  };

  return (
    <Container text style={{ margin: 20 }}>
      <Header as="h1">Friskvårdsbidragsuträknare</Header>
      <p>
        Applikationen räknar ut hur mycket semester du hinner jobba in till
        nästa semesterår, samt hur mycket Friskvårdsbidrag du har rätt till
        under kalenderåret du blev anställd.
      </p>
      <Header as="h5">Välj startdatum</Header>
      <DatePicker onChange={onDateChange} value={startingDate} />
      <Header as="h5">Antal semesterdagar</Header>
      <Input
        label={{ basic: true, content: "Dagar" }}
        labelPosition="right"
        type="number"
        size="mini"
        value={numberOfPaidVacationDays}
        name="quantity"
        min="25"
        placeholder={numberOfPaidVacationDays}
        onChange={onNumberOfPaidVacationDaysChange}
      />
      <Divider />
      {renderInfoBlobs()}
      {renderMessage()}
    </Container>
  );
}

export default App;
