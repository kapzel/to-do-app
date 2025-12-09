import React, { createContext, useContext, useState } from "react";

export interface Task {
  text: string;
  isFavorite: boolean;
}

export interface TasksContextType {
  tasks: Task[];
  addTask(text: string): void;
  delTask(index: number): void;
  moveUp(index: number): void;
  moveDown(index: number): void;
  toggleFavorite(index: number): void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used inside TasksProvider");
  }
  return context;
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(text: string) {
    if (text.trim() === "") return;
    setTasks([...tasks, { text, isFavorite: false }]);
  }

  function delTask(index: number) {
    if (tasks[index].isFavorite) return;
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0 || tasks[index].isFavorite) return;

    const copy = [...tasks];
    [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
    setTasks(copy);
  }

  function moveDown(index: number) {
    if (!tasks[index] || index >= tasks.length - 1 || tasks[index].isFavorite)
      return;

    const copy = [...tasks];
    [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
    setTasks(copy);
  }
  function toggleFavorite(index: number) {
    const copy = [...tasks];
    copy[index].isFavorite = !copy[index].isFavorite;
    if (copy[index].isFavorite) {
      const fav = copy.splice(index, 1)[0];
      copy.unshift(fav);
    } else {
      const unfav = copy.splice(index, 1)[0];
      const lastFavIndex = copy.filter((t) => t.isFavorite).length;
      copy.splice(lastFavIndex, 0, unfav);
    }

    setTasks(copy);
  }
  return (
    <TasksContext.Provider
      value={{ tasks, addTask, delTask, moveUp, moveDown, toggleFavorite }}
    >
      {children}
    </TasksContext.Provider>
  );
}
