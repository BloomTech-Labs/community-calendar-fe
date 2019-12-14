import React from "react";
import { foo, blar, zip } from "./foo.module.css";

export default function Thing() {
  return (
    <div className={`${foo} ${zip}`}>
      <p className={blar}>I use CSS modules</p>
    </div>
  );
}
