import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";
import AcceptRequest from "./AcceptRequest";
import AddEventForm from "./AddEvent";
import EventDetails from "./EventDetails";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        }
      />
      <Route
        path="/events/:eventId"
        element={
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/addevent"
        element={
          <PrivateRoute>
            <AddEventForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <PrivateRoute>
            <AcceptRequest />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
