import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";
import AcceptRequest from "./AcceptRequest";
import AddEventForm from "./AddEvent";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/events" element={<Events />} />
      <Route path="/addevent" element={<AddEventForm />} />
      <Route path="/logs" element={<AcceptRequest />} />
    </Routes>
  );
};

export default AllRoutes;
