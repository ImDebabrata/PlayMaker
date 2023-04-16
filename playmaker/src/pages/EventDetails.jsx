import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAcceptPlayerMutation,
  useApplyEventMutation,
  useEventsByIdQuery,
  useRejectPlayerMutation,
} from "../redux/apiSlice";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const EventDetails = () => {
  const [eventInfo, setEventInfo] = useState(null);
  const { eventId } = useParams();
  const { token, user } = useSelector((store) => store.auth);
  const [applyEvent] = useApplyEventMutation();
  const [acceptPlayer] = useAcceptPlayerMutation();
  const [rejectPlayer] = useRejectPlayerMutation();
  const { data, isLoading, isError, refetch } = useEventsByIdQuery({
    eventId,
    token,
  });
  useEffect(() => {
    refetch();
  }, []);
  // const events = data?.event || [];

  const handleJoinClick = () => {
    applyEvent({ eventId, token })
      .unwrap()
      .then((res) => {
        console.log(res);
        const newWaitingList = [
          ...eventInfo.waitingList,
          { _id: user.userID, username: user.username },
        ];
        setEventInfo((prevState) => ({
          ...prevState,
          waitingList: newWaitingList,
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleAcceptClick = (userId) => {
    // console.log("userId:", userId);
    acceptPlayer({ userId, eventId, token })
      .unwrap()
      .then((res) => {
        console.log(res);
        // Move user from waiting list to players list
        const removedUser = eventInfo.waitingList.find(
          (user) => user._id === userId
        );
        const newWaitingList = eventInfo.waitingList.filter(
          (user) => user._id !== userId
        );
        const newPlayers = [...eventInfo.players, removedUser];
        // Update the eventInfo state with the new waiting list and players list
        setEventInfo((prevState) => ({
          ...prevState,
          waitingList: newWaitingList,
          players: newPlayers,
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleRejectClick = (userId) => {
    rejectPlayer({ userId, eventId, token })
      .unwrap()
      .then((res) => {
        // Show a success message to the user
        console.log(res.res);
        // Remove user from waiting list
        const newWaitingList = eventInfo.waitingList.filter(
          (user) => user._id !== userId
        );
        // Update the eventInfo state with the new waiting list and players list
        setEventInfo((prevState) => ({
          ...prevState,
          waitingList: newWaitingList,
        }));
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (eventInfo === null && data.event) {
    //deep coppy object
    setEventInfo(JSON.parse(JSON.stringify(data.event)));
  }
  if (eventInfo === null) {
    return <div>Wait</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3">{eventInfo?.name}</Typography>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">{eventInfo.description}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Date and Time:{" "}
              {new Date(eventInfo.timings).toLocaleString("en-US", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Organizer: {eventInfo?.organizer?.username}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Player Limit: {eventInfo?.playerLimit}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {/* Checking current user is the organizer */}
      {eventInfo.organizer?._id === user?.userID ? (
        <Box>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Player List</Typography>
              {eventInfo?.players?.map((player) => (
                <Box
                  key={player._id}
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "7px",
                  }}
                >
                  <Typography
                    color={"white"}
                    variant="subtitle1"
                    sx={{ mt: 1 }}
                  >
                    {player.username}
                  </Typography>
                </Box>
              ))}
              {eventInfo?.waitingList?.length > 0 && (
                <div>
                  <Typography variant="subtitle1">Waiting List:</Typography>
                  {eventInfo.waitingList.map((player) => (
                    <Box
                      key={player._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ m: 1 }}>
                        {player.username}
                      </Typography>
                      <div>
                        <Button
                          onClick={() => handleAcceptClick(player._id)}
                          variant="contained"
                          size="small"
                          color="success"
                          sx={{ mx: 1 }}
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleRejectClick(player._id)}
                          color="error"
                          variant="contained"
                          size="small"
                          sx={{ mx: 1 }}
                        >
                          Reject
                        </Button>
                      </div>
                    </Box>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Request to Join</Typography>
              {/* if player is in player or waiting list */}
              {/* {eventInfo.players.find((player) => player._id === user._id) ? ( */}
              {eventInfo.players.find(
                (player) => player._id === user?.userID
              ) ||
              eventInfo.waitingList.find(
                (player) => player._id === user?.userID
              ) ? (
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
        </Box>
      )}
    </Container>
  );
};

export default EventDetails;
