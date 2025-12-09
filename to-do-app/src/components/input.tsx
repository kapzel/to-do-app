import React, { useState } from "react";
import "./styles.scss";
import { useTasksContext } from "./context/tasksContext";

function Input() {
  const { tasks, addTask, delTask, moveUp, moveDown, toggleFavorite } =
    useTasksContext();

  const [newTask, setNewTask] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleAdd() {
    addTask(newTask);
    setNewTask("");
  }
  return (
    <div className="list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Add task..."
          value={newTask}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task.text}</span>

            <button onClick={() => toggleFavorite(index)}>
              {task.isFavorite ? "Unfavorite" : "Favorite"}
            </button>

            {!task.isFavorite && (
              <>
                <button onClick={() => delTask(index)}>Delete</button>
                <button onClick={() => moveUp(index)}>Up</button>
                <button onClick={() => moveDown(index)}>Down</button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
export default Input;
