import React, { createContext, useState, useEffect } from "react";
import Home from "../src/Pages/Home/Home";
import SignIn from "../src/Pages/SignIn/SignIn";
import SignUp from "../src/Pages/SignUp/SignUp";
import MainDashboard from "./Pages/Dashboard/main";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardContent from "./Pages/Dashboard/Dashboard";
import Monitor from "./Pages/Dashboard/Monitor";
import ActiveChat from "./Pages/Dashboard/ActiveChat";
import Messaging from "./Pages/Dashboard/Messaging";
import axios from "axios";
import Loading from "../src/Pages/Loading/Loading";
const AuthContext = createContext("");

function App() {
  const [authState, setAuthState] = useState({
    LoggedUserData: "",
    status: false,
  });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../../chat-module/chat.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/signin/verifyToken", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setloading(false);
        if (response.data.error) {
          setAuthState(false);
        } else {
          console.log(response.data.userData);
          setAuthState({
            LoggedUserData: response.data.userData,
            status: true,
          });
          console.log(authState);
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path="/" element={<Home />} />
        {!authState.status ? (
          <Route path="/signin" element={<SignIn />} />
        ) : (
          <Route
            path="/signin"
            element={<Navigate replace to="/dashboard" />}
          />
        )}
        {!authState.status ? (
          <Route path="/signup" element={<SignUp />} />
        ) : (
          <Route
            path="/signup"
            element={<Navigate replace to="/dashboard" />}
          />
        )}
        <Route path="signup" element={<SignUp />} />
        {loading ? (
          <Route path="/dashboard" element={<Loading />} />
        ) : authState ? (
          <Route path="/dashboard" element={<MainDashboard />}>
            <Route path="" element={<DashboardContent />} />
            <Route path="monitor" element={<Monitor />} />
            <Route path="activechat" element={<ActiveChat />} />
            <Route path="messaging" element={<Messaging />} />
          </Route>
        ) : (
          <Route
            path="/dashboard"
            element={<p className="h1">Please login First</p>}
          />
        )}
        <Route
          path="*"
          element={
            <p className="h1 mx-auto">
              {" "}
              404 Error <br /> page not found
            </p>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}
export default App;
export { AuthContext };
