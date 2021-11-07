import React from "react";
import { Header, Segment, Icon } from "semantic-ui-react";

const square = { width: 200, height: 200 };

function InfoCircle({ header, subHeader, description, icon }) {
  return (
    <>
      <Segment circular style={square}>
        <Header as="h3" icon>
          <Icon name={icon} />
          {header}
          <Header.Subheader>{subHeader}</Header.Subheader>
        </Header>
      </Segment>
      <Header as="h4" textAlign="center">
        {description}
      </Header>
    </>
  );
}

export default InfoCircle;
