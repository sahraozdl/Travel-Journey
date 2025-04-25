import React from "react";
import "./index.css"; // Add this at the top of index.js
import {createRoot} from "react-dom/client";
import  App from "./App.js";
import { UserProvider } from "./context/UserContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<UserProvider>
    <App />
  </UserProvider>
  </React.StrictMode>
  );