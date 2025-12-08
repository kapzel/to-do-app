import { useEffect, useState } from "react";
import "./styles.scss";

export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="timer">{time.toLocaleTimeString()}</p>;
}
