import React, { useState } from "react";
import { useTaskStore } from "./store";
import { Link } from "react-router-dom";
const TaskInput = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    category: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      ...formData,
      id: Date.now(),
      completed: false,
    };
    addTask(newTask);
    setFormData({ title: "", startTime: "", endTime: "", category: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="px-3 max-w-150 mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          name="title"
          id="title"
          placeholder="Type your todo..."
          value={formData.title}
          onChange={handleChange}
          className="w-full"
        />
        <input
          type="text"
          required
          name="title"
          id="title"
          placeholder="Description (optional)..."
          className="w-full mt-2"
        />
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mt-2"
        >
          <option value="">Please select category</option>
          <option value="all">All</option>
          <option value="coding">Coding</option>
          <option value="team">Team</option>
          <option value="personal">Private</option>
        </select>

        <div className="flex gap-2 mt-2 mb-1 w-full">
          {" "}
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full"
            required
          />
          <input
            type="time"
            name="endTime"
            id="endTime"
            placeholder="end time"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-black text-white rounded hover:border"
        >
          Add Task
        </button>
      </form>
      <div className="text-center w-full mt-5">
        <Link to={"/"}>See tasks</Link>
      </div>
    </div>
  );
};

export default TaskInput;
