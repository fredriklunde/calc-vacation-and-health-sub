import React, { useState } from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import { useTranslation } from "react-i18next";
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

function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
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
    setMessage(t("message.informationOnFuture"));
  };

  const renderMessage = () => {
    if (message) {
      return <p className="ui info message">{message}</p>;
    }
  };

  const renderVacationDaysText = () => {
    if (startingDate) {
      const startYearOfFirstVacationYear =
        getYearOfFirstVacationPeriod(startingDate);
      const endYearOfFirstVacationYear = startYearOfFirstVacationYear + 1;
      return (
        <Header as="h4" textAlign="center">
          {t("vacation.sub-info", {
            startYear: startYearOfFirstVacationYear,
            endYear: endYearOfFirstVacationYear,
          })}
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
                {t("start-date")}
                <Header.Subheader>
                  {moment(startingDate).format("YYYY-MM-DD")}
                </Header.Subheader>
              </Header>
            </Segment>
            <Header as="h4" textAlign="center">
              {t("start-date-sub-title")}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h3" icon>
                <Icon name="heart" />
                {t("wellness-allowance")}
                <Header.Subheader>{healtCareSubThisYear}</Header.Subheader>
              </Header>
            </Segment>
            <Header as="h4" textAlign="center">
              {t("wellness-allowance")} {moment(startingDate).format("YYYY")}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Segment circular style={square}>
              <Header as="h3" icon>
                <Icon name="sun" />
                {t("vacation.vacation-days")}
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
      <div>
        <button type="submit" onClick={() => changeLanguage("sv")}>
          sv
        </button>
        <button type="submit" onClick={() => changeLanguage("en")}>
          en
        </button>
      </div>
      <Header as="h1">{t("title")}</Header>
      <p>{t("sub-title")}</p>
      <Header as="h5">{t("select-star-date")}</Header>
      <DatePicker onChange={onDateChange} value={startingDate} />
      <Header as="h5">{t("vacation.number-of-vacation-days")}</Header>
      <Input
        label={{ basic: true, content: t("days") }}
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

export default Page;
