import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Header, Grid } from "semantic-ui-react";
import InfoCircle from "./common/InfoCircle";

import { getYearOfFirstVacationPeriod } from "../logic/calc";

function ResultSection({
  startingDate,
  healtCareSubThisYear,
  vacationDaysNextPeriod,
}) {
  const { t } = useTranslation();

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

  return (
    <Grid stackable columns={3}>
      <Grid.Column>
        <InfoCircle
          header={t("start-date")}
          subHeader={moment(startingDate).format("YYYY-MM-DD")}
          description={t("start-date-sub-title")}
          icon="angle right"
        />
      </Grid.Column>
      <Grid.Column>
        <InfoCircle
          header={t("wellness-allowance")}
          subHeader={healtCareSubThisYear}
          description={
            t("wellness-allowance") + moment(startingDate).format("YYYY")
          }
          icon="heart"
        />
      </Grid.Column>
      <Grid.Column>
        <InfoCircle
          header={t("vacation.vacation-days")}
          subHeader={vacationDaysNextPeriod}
          description={renderVacationDaysText}
          icon="sun"
        />
      </Grid.Column>
    </Grid>
  );
}

export default ResultSection;
