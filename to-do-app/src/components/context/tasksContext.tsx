import React, { createContext, useContext, useState } from "react";

export type Task = {
  text: string;
  isFavorite: boolean;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  delTask: (index: number) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  toggleFavorite: (index: number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used inside <TasksProvider>");
  }
  return context;
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
}
