import "./App.css";
import Input from "./components/input";
import Timer from "./components/timer";
import React, { useState, useEffect } from "react";
import { LayoutContext } from "./components/context/LayoutContext";

function App() {
  const [style, setStyle] = useState("light");

  const changeStyle = () =>
    setStyle((prev: string) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.body.className = style;
  }, [style]);

  return (
    <LayoutContext.Provider value={{ style, changeStyle }}>
      <div className={`app ${style}`}>
        <label className="switch">
          <input onChange={changeStyle} type="checkbox" />
          <span className="slider round"></span>
        </label>

        <Timer />
        <Input />
      </div>
    </LayoutContext.Provider>
  );
}

export default App;
