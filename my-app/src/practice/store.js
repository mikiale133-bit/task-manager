import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      toggleTask: (taskID) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskID ? { ...task, completed: !task.completed } : task,
          ),
        })),

      removeTask: (taskID) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskID),
        })),

      updateTask: (taskId, title, startTime, endTime, category) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, title, startTime, endTime, category }
              : task,
          ),
        })),
    }),
    { name: "task-storage" },
  ),
);
