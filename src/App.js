import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./pages/HomePage";
import GoalsPage from "./pages/GoalsPage";
import FoodPage from "./pages/FoodPage";
import ExercisePage from "./pages/ExercisePage";
import SleepPage from "./pages/SleepPage";
import WeightPage from "./pages/WeightPage";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/weight" element={<WeightPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
