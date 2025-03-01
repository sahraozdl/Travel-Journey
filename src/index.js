import React from "react";
import "./index.css"; // Add this at the top of index.js
import {createRoot} from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);