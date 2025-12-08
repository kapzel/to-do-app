import "./App.css";
import Input from "./components/input";
import Timer from "./components/timer";
import React, { useState, useEffect } from "react";

function App() {
  const [style, setStyle] = useState("light");

  const changeStyle = () => {
    setStyle((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = style;
  }, [style]);

  return (
    <div className={`app ${style}`}>
      <label className="switch">
        <input onChange={changeStyle} type="checkbox" />
        <span className="slider round"></span>
      </label>

      <Timer />
      <Input />
    </div>
  );
}

export default App;
