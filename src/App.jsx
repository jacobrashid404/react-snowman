import React from "react";
import Snowman from "./Snowman.jsx";
import { ENGLISH_WORDS } from "./words.js";
import "./App.css";

/** Renders page (with Snowman game) */

function App() {
  return (
    <div className="App">
      <Snowman words={ENGLISH_WORDS}/>
    </div>
  );
}

export default App;
