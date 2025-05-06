import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { UserProvider,UserContext } from "./context/UserContext.jsx";
import Loader from "./components/loader.jsx";

const root = createRoot(document.getElementById("root"));

function Root() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({loading}) =>
        loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-auto">
            <Loader/>
          </div>
        ) : (
          <App/>
        )
        }
      </UserContext.Consumer>
    </UserProvider>
  )
}

root.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>
);
