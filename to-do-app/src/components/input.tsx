import React, { useState } from "react";
import "./styles.scss";

type Task = {
  text: string;
  isFavorite: boolean;
};

function Input() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, isFavorite: false }]);
      setNewTask("");
    }
  }

  function delTask(index: number) {
    if (tasks[index].isFavorite) return; // can't delete favorite
    setTasks((t) => t.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index > 0 && !tasks[index].isFavorite) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [
        updated[index - 1],
        updated[index],
      ];
      setTasks(updated);
    }
  }

  function moveDown(index: number) {
    if (index < tasks.length - 1 && !tasks[index].isFavorite) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];
      setTasks(updated);
    }
  }

  function toggleFavorite(index: number) {
    const updated = [...tasks];

    updated[index].isFavorite = !updated[index].isFavorite;

    if (updated[index].isFavorite) {
      // move to top
      const favTask = updated.splice(index, 1)[0];
      updated.unshift(favTask);
    } else {
      // remove from favorite: move to bottom of fav section
      const unfavTask = updated.splice(index, 1)[0];

      // find last favorite index
      const lastFavIndex = updated.filter((t) => t.isFavorite).length;

      // insert after favorites
      updated.splice(lastFavIndex, 0, unfavTask);
    }

    setTasks(updated);
  }

  return (
    <div className="list">
      <h1>To-Do list</h1>

      <div>
        <input
          type="text"
          placeholder="Add task..."
          value={newTask}
          onChange={handleChange}
        />
        <button className="addButton" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task.text}</span>

            <div className="btnCont">
              {/* Favorite toggle button */}
              <button
                className="favButton"
                onClick={() => toggleFavorite(index)}
                style={{
                  backgroundColor: task.isFavorite ? "gold" : "gold",
                }}
              >
                {task.isFavorite ? "★ Unfavorite" : "★ Favorite"}
              </button>

              {/* Hide delete/move if favorite */}
              {!task.isFavorite && (
                <>
                  <button className="delButton" onClick={() => delTask(index)}>
                    Delete
                  </button>

                  <button className="moveButton" onClick={() => moveUp(index)}>
                    👆
                  </button>

                  <button
                    className="moveButton"
                    onClick={() => moveDown(index)}
                  >
                    👇
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Input;
