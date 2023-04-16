import React from "react";
import { useParams } from "react-router-dom";
import { useApplyEventMutation, useEventsByIdQuery } from "../redux/apiSlice";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const EventDetails = () => {
  const { eventId } = useParams();
  const { token } = useSelector((store) => store.auth);
  const [applyEvent] = useApplyEventMutation();
  const { data, isLoading, isError } = useEventsByIdQuery({ eventId, token });
  const events = data?.event || [];
  console.log("events:", events);

  const handleJoinClick = () => {
    applyEvent({ eventId, token })
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3">{events?.name}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">{events.description}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Date and Time:{" "}
                {new Date(events.timings).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Organizer: {events?.organizer?.username}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Player Limit: {events?.playerLimit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* {events?.organizer?._id === user?._id && (
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Player List</Typography>
                {events.players.map((player) => (
                  <div key={player._id}>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      player.username
                    </Typography>
                  </div>
                ))}
                {events?.waitingList.length > 0 && (
                  <div>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Waiting List:
                    </Typography>
                    {events.waitingList.map((player) => (
                      <div key={player._id}>
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                          {player.username}{" "}
                          <Button
                            onClick={() => handleAcceptClick(player)}
                            variant="contained"
                            size="small"
                            sx={{ mx: 1 }}
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleRejectClick(player)}
                            variant="contained"
                            size="small"
                            sx={{ mx: 1 }}
                          >
                            Reject
                          </Button>
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        )} */}

        {/* //If user is not created the event */}
        {/* {events.organizer._id !== user._id && ( */}
        {true && (
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Request to Join</Typography>
                {/* if player is in list */}
                {/* {events.players.find((player) => player._id === user._id) ? ( */}
                {false ? (
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    You have already joined this event
                  </Typography>
                ) : (
                  <Button
                    onClick={handleJoinClick}
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    Join Event
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default EventDetails;
