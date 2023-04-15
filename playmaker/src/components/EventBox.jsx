import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";

const StyledCard = styled(Card)`
  && {
    height: 100%;
  }
`;

const StyledCardContent = styled(CardContent)`
  && {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    margin-bottom: auto;
  }
`;

const EventBox = ({ name, description, playerLimit, organizer, timings }) => {
  return (
    <StyledCard variant="outlined">
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h6" component="div">
          {name}
        </StyledTypography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: "auto" }}>
          Organizer: {organizer}
        </Typography>
        <Typography variant="subtitle1">Player Limit: {playerLimit}</Typography>
        <Typography variant="subtitle1">
          Timing: {new Date(timings).toLocaleTimeString()}{" "}
          {new Date(timings).toLocaleDateString()}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default EventBox;
