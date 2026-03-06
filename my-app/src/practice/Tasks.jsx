import React, { useState } from "react";

import { useTaskStore } from "./store";
import { Link } from "react-router-dom";
const Tasks = () => {
  // zustand store
  const removeTask = useTaskStore((state) => state.removeTask);
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  // editing states
  const [activeModalID, setActiveModalID] = useState(null);
  const [editingID, setEditingID] = useState(null);

  // Filter and search Tasks
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    const categoryMatch = filter === "all" || task.category === filter;
    const searchMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const [editData, setEditData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    category: "",
  });

  const startEditing = (task) => {
    setEditingID(editingID === task.id ? null : task.id);

    setEditData({
      title: task.title,
      startTime: task.startTime,
      endTime: task.endTime,
      category: task.category,
    });
  };

  const handleSave = (id) => {
    updateTask(
      id,
      editData.title,
      editData.category,
      editData.startTime,
      editData.endTime,
      editData.category,
    );
    setEditData({ title: "", startTime: "", endTime: "" });
    setEditingID(null);
  };

  const cancelEditing = () => {
    setEditingID(null);
  };
  const handleModalOpen = (id) => {
    setActiveModalID(activeModalID === id ? null : id);
  };

  if (tasks.length === 0)
    return (
      <div className="text-center">
        <p className="mb-5">You don't have any task yet...</p>
        <Link
          to={"/"}
          className="bg-blue-500 text-white px-5 py-2 ml-2 rounded "
        >
          Create one
        </Link>
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto px-2">
      <div className="text-end rounded-full  mb-2 flex justify-end gap-3 items-center ">
        <div className="filters">
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md px-5"
          >
            <option value="all">All Tasks</option>
            <option value="coding">Coding</option>
            <option value="team">Team</option>
            <option value="personal">Private</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search a task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white w-full rounded-full border border-blue-600"
          />
          <button aria-label="Search" className="absolute top-2 right-2">
            🔍
          </button>
        </div>
      </div>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 mb-5">
          No task found based on your search...
        </p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id}>
            {editingID === task.id ? (
              <div className="absolute top-0 left-0 h-screen w-screen bg-white z-100 flex justify-center items-center p-5">
                <div className="max-w-5xl w-full border border-gray-300 rounded p-3">
                  <h2 className="text-center mb-5">Editing a task...</h2>
                  <input
                    type="text"
                    required
                    name="title"
                    id="title"
                    placeholder="Type your todo..."
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full"
                  />

                  <input
                    type="text"
                    required
                    name="description"
                    id="description"
                    placeholder="Description (optional)..."
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="w-full mt-2"
                  />
                  <select
                    name="category"
                    id="category"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="w-full mt-2"
                  >
                    <option value="">Select category...</option>
                    <option value="coding">Coding</option>
                    <option value="team">Team</option>
                    <option value="personal">Personal</option>
                  </select>

                  <div className="flex gap-2 mt-2 mb-1 w-full">
                    {" "}
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      value={editData.startTime}
                      onChange={(e) =>
                        setEditData({ ...editData, startTime: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                    <input
                      type="time"
                      name="endTime"
                      id="endTime"
                      placeholder="end time"
                      value={editData.endTime}
                      onChange={(e) =>
                        setEditData({ ...editData, endTime: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="flex gap-2 bg-gray-500 p-3 mt-5">
                    <button
                      type="submit"
                      onClick={() => cancelEditing()}
                      className="w-full p-2 gray-200  bg-white text-black  rounded hover:border"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      onClick={() => handleSave(task.id)}
                      className="w-full p-2 gray-200 bg-gray-300 text-black rounded hover:border"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={`border border-gray-300 border-x-5 rounded p-2 mr mb-2 flex justify-between items-center ${task.completed ? "border-gray-900 border-2 border-x-8" : ""}`}
                >
                  <div>
                    <h2 className="text-md font-bold">{task.title}</h2>
                    <p className="text-gray-400 text-sm">
                      ⏱️{task.startTime} to {task.endTime}
                    </p>
                    {/* <p className="text-sm text-gray-500">{task.date}</p> */}
                  </div>
                  <div className="flex gap-3 items-center relative">
                    <span>
                      {task.completed ? (
                        <p className="text-2xl text-black">✓</p>
                      ) : (
                        <p>❓</p>
                      )}
                    </span>

                    <button
                      onClick={() => handleModalOpen(task.id)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      ⁝
                    </button>
                    <div
                      className={`absolute top-0 right-5 cursor-pointer bg-white border border-gray-300 rounded w-40 flex flex-col items-start z-10  ${activeModalID === task.id ? "" : "hidden"}`}
                    >
                      <button
                        onClick={() => startEditing(task)}
                        className="border-b w-full text-start border-gray-200 font-semibold hover:text-gray-500 pb-1 pl-1"
                      >
                        edit
                      </button>
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="border-b w-full text-start border-gray-200 font-semibold hover:text-gray-500 pb-1 pl-1"
                      >
                        {task.completed ? "Unfinish" : "Finish"}
                      </button>
                      <button className="border-b w-full text-start border-gray-200 font-semibold hover:text-gray-500 pb-1 pl-1">
                        copy
                      </button>
                      <button className="border-b w-full text-start border-gray-200 font-semibold hover:text-gray-500 pb-1 pl-1">
                        save
                      </button>
                      <button className="border-b w-full text-start border-gray-200 font-semibold hover:text-gray-500 pb-1 pl-1">
                        move to trash
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="border-b w-full text-start border-gray-200 font-semibold hover:text-gray-500 pb-1 pl-1"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      <Link
        to={"/create"}
        className={`bg-blue-500 ${filteredTasks.length === 0 ? "hidden" : ""} text-white p-1 flex items-center gap-2 justify-center`}
      >
        + <span>Add</span>
      </Link>
    </div>
  );
};

export default Tasks;
