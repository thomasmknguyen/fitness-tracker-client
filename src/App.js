import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import GoalsPage from "./components/GoalsPage";
import FoodPage from "./components/FoodPage";
import ExercisePage from "./components/ExercisePage";
import SleepPage from "./components/SleepPage";
import WeightPage from "./components/WeightPage";

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
