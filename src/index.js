import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RegisterPage from "./components/RegisterPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegisterPage />
  </React.StrictMode>
);
