import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useAddEventsMutation } from "../redux/apiSlice";
import { useSelector } from "react-redux";

const AddEventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [playerLimit, setPlayerLimit] = useState("");

  const [addEvents, { isError, isLoading }] = useAddEventsMutation();
  const { token } = useSelector((store) => store.auth);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const handlePlayerLimitChange = (event) => {
    setPlayerLimit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submit logic here
    const payload = { name, description, timings: dateTime, playerLimit };
    addEvents({ payload, token })
      .unwrap()
      .then((res) => alert(res.res))
      .catch((err) => alert(err.data.res));
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date and Time"
            value={dateTime}
            onChange={handleDateTimeChange}
            type="datetime-local"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <DateRangeIcon /> */}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Player Limit"
            value={playerLimit}
            onChange={handlePlayerLimitChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" fullWidth>
            Add Event
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEventForm;
