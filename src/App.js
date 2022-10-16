import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import GoalsPage from "./components/GoalsPage";
import FoodPage from "./components/FoodPage";
import ExercisePage from "./components/ExercisePage";
import SleepPage from "./components/SleepPage";
import WeightPage from "./components/WeightPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  // TODO: Change isAuthenticated to false
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated && <MyNavbar setAuthenticated={setIsAuthenticated} />}
      <Routes>
        {isAuthenticated && (
          <React.Fragment>
            <Route path="/home" element={<HomePage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/weight" element={<WeightPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </React.Fragment>
        )}
        {!isAuthenticated && (
          <React.Fragment>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </React.Fragment>
        )}
      </Routes>
    </div>
  );
}

export default App;
