import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext";


const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
