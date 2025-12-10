import { useState, useEffect } from "react";

export default function TitleBtn() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Number of task: {count}";
  }, [count]);
}
