import React, { useState } from "react";
import styled from "styled-components";
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import EventBox from "../components/EventBox";
import { useEventsQuery } from "../redux/apiSlice";
import { useSelector } from "react-redux";

const EventPageWrapper = styled.div`
  padding: 24px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SortByWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin-left: 16px;
    width: 120px;

    @media (max-width: 600px) {
      margin-top: 16px;
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const EventGrid = styled(Grid)`
  && {
    margin-top: 16px;

    @media (max-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const Events = () => {
  const { token } = useSelector((store) => store.auth);
  const { data, isLoading, isError } = useEventsQuery(token);
  const eventList = data?.events || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("playerLimit");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedEventList = [...eventList].sort((a, b) =>
    a[sortBy] > b[sortBy] ? 1 : -1
  );

  const filteredEventList = sortedEventList.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <EventPageWrapper>
      <SearchWrapper>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-search"></i>
              </InputAdornment>
            ),
          }}
          sx={{ width: "50%" }}
        />
        <SortByWrapper>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            Sort by:
          </Typography>
          <StyledFormControl variant="outlined">
            <Select value={sortBy} onChange={handleSortByChange} sx={{ pl: 1 }}>
              <MenuItem value="playerLimit">Player Limit</MenuItem>
              <MenuItem value="timings">Timings</MenuItem>
            </Select>
          </StyledFormControl>
        </SortByWrapper>
      </SearchWrapper>
      <EventGrid container spacing={3}>
        {filteredEventList.map((event) => (
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
    </EventPageWrapper>
  );
};

export default Events;
