import React, { useEffect } from "react";
import { useApplyEventLogQuery } from "../redux/apiSlice";
import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";
import EventBox from "../components/EventBox";
import { EventGrid } from "./Events";

const AcceptRequest = () => {
  const { token, user } = useSelector((store) => store.auth);
  const { data, isLoading, isError, refetch } = useApplyEventLogQuery({
    token,
    userId: user?.userID,
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <Container maxWidth="md">
      <Typography variant="h5">Accepted</Typography>
      <EventGrid container spacing={3}>
        {data?.acceptedEvents?.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
            <EventBox
              name={event.name}
              description={event.description}
              playerLimit={event.playerLimit}
              organizer={event.organizer.username}
              organizer_id={event.organizer._id}
              timings={event.timings}
              id={event._id}
            />
          </Grid>
        ))}
      </EventGrid>
      <Typography variant="h5">Waiting</Typography>
      <EventGrid container spacing={3}>
        {data?.pendingEvents?.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
            <EventBox
              name={event.name}
              description={event.description}
              playerLimit={event.playerLimit}
              organizer={event.organizer.username}
              organizer_id={event.organizer._id}
              timings={event.timings}
              id={event._id}
            />
          </Grid>
        ))}
      </EventGrid>
    </Container>
  );
};

export default AcceptRequest;
