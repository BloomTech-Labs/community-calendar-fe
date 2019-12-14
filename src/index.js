import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import "./blah.css";

ReactDOM.render(
  <App title={"React is cool"} />,
  document.getElementById("root"),
);

// Updates the app without refreshing the browser in development
if (process.env.NODE_ENV === "development") {
  module.hot.accept();
}
