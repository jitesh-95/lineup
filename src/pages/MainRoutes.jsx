import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRequire from "../hoc/AuthRequire";
import EditPage from "./EditPage";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import TodoApp from "./TodoApp";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/app"
        element={
          <AuthRequire>
            <TodoApp />
          </AuthRequire>
        }
      />
      <Route
        path="/app/:id"
        element={
          <AuthRequire>
            <EditPage />
          </AuthRequire>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
