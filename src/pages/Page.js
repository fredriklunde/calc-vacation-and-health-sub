import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { useTranslation } from "react-i18next";
import { Container, Header, Input, Divider } from "semantic-ui-react";

import {
  calculateHealthCareSub,
  calculateNumberOfVacationDaysNextPeriod,
} from "../logic/calc";
import LanguageSelector from "../components/common/LanguageSelector";
import ResultSection from "../components/ResultSection";

function Page() {
  const { t } = useTranslation();

  const [startingDate, setStartingDate] = useState(null);
  const [numberOfPaidVacationDays, setNumberOfPaidVacationDays] = useState(25);
  const [healtCareSubThisYear, setHealtCareSubThisYear] = useState(0);
  const [vacationDaysNextPeriod, setVacationDaysNextPeriod] = useState(0);
  const [message, setMessage] = useState(null);

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
    const healtCareSubThisYear = calculateHealthCareSub(startingDate);
    setHealtCareSubThisYear(healtCareSubThisYear);
    setStartingDate(startingDate);
    setVactationDays(startingDate);
    setMessage(t("message.informationOnFuture"));
  };

  const renderMessage = () => {
    if (message) {
      return <p className="ui info message">{message}</p>;
    }
  };

  return (
    <Container text style={{ margin: 20 }}>
      <LanguageSelector />
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
      {startingDate ? (
        <ResultSection
          startingDate={startingDate}
          healtCareSubThisYear={healtCareSubThisYear}
          vacationDaysNextPeriod={vacationDaysNextPeriod}
        />
      ) : (
        ""
      )}
      {renderMessage()}
    </Container>
  );
}

export default Page;
