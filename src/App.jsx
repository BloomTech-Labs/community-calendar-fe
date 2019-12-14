import React from "react"
import { app } from "./App.module.scss"

const App = props => {
  return <div className={app}>{props.title}</div>
}

export default App
