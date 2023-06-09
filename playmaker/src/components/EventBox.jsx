import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledCard = styled(Card)`
  && {
    height: 100%;
    border-top: ${(style) => style.bordervarient || "1px solid red"};
    border-bottom: ${(style) => style.bordervarient || "1px solid red"};
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

const EventBox = ({
  name,
  description,
  playerLimit,
  organizer,
  organizer_id,
  timings,
  id,
}) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleNavigate = () => {
    // console.log("clicking", id);
    navigate(`/events/${id}`);
  };
  return (
    <StyledCard
      bordervarient={user?.userID === organizer_id && "5px solid green"}
      onClick={handleNavigate}
      variant="outlined"
    >
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h6" component="div">
          {name}
        </StyledTypography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: "auto" }}>
          Organizer: {organizer}
          {user?.userID === organizer_id && " (Created By Me)"}
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
