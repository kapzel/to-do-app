import React, { createContext, useContext, useState } from "react";

export type Task = {
  text: string;
  isFavorite: boolean;
};
type TasksContextType = {
  tasks: Task[];
  addTask: t;
};
