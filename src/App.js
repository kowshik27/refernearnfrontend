import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectedRoute from "./Protected";
import Otp from "./components/Otp";
import "react-toastify/dist/ReactToastify.css";
import Verifyemail from "./components/Verifyemail";

function App() {
  // console.log(process.env.REACT_APP_PUBLIC_URL);
  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<ProtectedRoute component={Rewards} />}
          ></Route>
          <Route
            exact
            path="/login"
            element={
              <div className="h-screen w-screen flex justify-center items-center">
                <Login />
              </div>
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={
              <div className="h-screen w-screen flex justify-center items-center">
                <SignUp />
              </div>
            }
          ></Route>
          <Route path="/rewards" element={<Rewards />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/otp"
            element={
              <div className="h-screen w-screen flex justify-center items-center">
                <Otp />
              </div>
            }
          ></Route>
          <Route
            path="/referal/:id"
            element={<ProtectedRoute component={Rewards} />}
          ></Route>
          <Route
            path="/confirmation/:id"
            element={
              <div className="h-screen w-screen flex justify-center items-center">
                <Verifyemail />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
