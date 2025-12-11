import "./App.css";
import Input from "./components/input";
import Timer from "./components/timer";
import { useState, useEffect } from "react";
import { TasksProvider } from "./components/context/tasksContext";

function App() {
  const [style, setStyle] = useState("light");

  const changeStyle = () =>
    setStyle((prev: string) => (prev === "light" ? "dark" : "light"));

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

      <TasksProvider>
        <Input />
      </TasksProvider>
    </div>
  );
}

export default App;
