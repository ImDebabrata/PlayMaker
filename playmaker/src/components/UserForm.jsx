import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";

const UserForm = ({ title, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    // Handle login logic here
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            {title}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserForm;
