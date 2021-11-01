import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Header, Grid, Segment, Icon } from "semantic-ui-react";

import { getYearOfFirstVacationPeriod } from "../logic/calc";

const square = { width: 200, height: 200 };

function ResultBlobs({
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

export default ResultBlobs;
