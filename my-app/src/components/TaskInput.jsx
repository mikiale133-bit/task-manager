import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

export const TaskInput = () => {
  const [text, setText] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask({
      id: Date.now(), // Simple way to generate a unique ID
      text: text,
      completed: false,
    });

    setText(""); // Clear the input after adding
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
