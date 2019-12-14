import React from "react";
import { app, zerb, nerk, grayImage } from "./App.module.scss";
import Thing from "./Thing";

const App = props => {
  return (
    <div className="blah">
      <div className={app}>
        <p>I'm a SCSS module</p>
        <p className={`${zerb} ${nerk}`}>{props.title}</p>
        <div className={grayImage}></div>
      </div>
      <Thing />{" "}
    </div>
  );
};

export default App;
