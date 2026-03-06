import React, { useState } from "react";

import { useTaskStore } from "./store";
import { Link } from "react-router-dom";
const Tasks = () => {
  const removeTask = useTaskStore((state) => state.removeTask);
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const [activeModalID, setActiveModalID] = useState(null);
  const [editingID, setEditingID] = useState(null);

  // Filter Tasks
  const [searchTerm, setSearchTerm] = useState("");

  const searchResultTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
    );
    setEditData({ title: "", startTime: "", endTime: "" });
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
      <div className="text-end bg-blue-200 rounded-full  mb-2 flex justify-start items-center relative">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search a task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white w-full rounded-full border border-blue-600"
        />
        <button className="absolute top-9.1 right-2">🔍</button>
      </div>
      {searchResultTasks.length === 0 ? (
        <p className="text-gray-500 mb-5">
          No task found based on your search...
        </p>
      ) : (
        searchResultTasks.map((task) => (
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
                    name="title"
                    id="title"
                    placeholder="Description (optional)..."
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full mt-2"
                  />
                  <select name="category" id="category" className="w-full mt-2">
                    <option value="">Select category...</option>
                    <option value="">Coding</option>
                    <option value="">Academic</option>
                    <option value="">Ordinary</option>
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
                      onClick={() => handleSave(task.id)}
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
                    <p>{task.category}</p>
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
        to={"/"}
        className={`bg-blue-500 ${searchResultTasks.length === 0 ? "hidden" : ""} text-white p-1 flex items-center gap-2 justify-center`}
      >
        + <span>Add</span>
      </Link>
    </div>
  );
};

export default Tasks;

// const Tasks = () => {
//   const tasks = useTaskStore((state) => state.tasks);
//   const updateTask = useTaskStore((state) => state.updateTask); // Hook up the store action
//   const [editingID, setEditingID] = useState(null);

//   // Temporary local state for the task being edited
//   const [editData, setEditData] = useState({ title: "", startTime: "", endTime: "" });

//   const startEditing = (task) => {
//     setEditingID(task.id);
//     setEditData({ title: task.title, startTime: task.startTime, endTime: task.endTime });
//   };

//   const saveEdit = (id) => {
//     updateTask(id, editData.title, editData.startTime, editData.endTime);
//     setEditingID(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       {tasks.map((task) => (
//         <div key={task.id} className="...">
//           {editingID === task.id ? (
//             /* --- EDIT MODE UI --- */
//             <div className="flex flex-col gap-2 w-full">
//               <input
//                 className="border p-1 font-bold"
//                 value={editData.title}
//                 onChange={(e) => setEditData({...editData, title: e.target.value})}
//               />
//               <div className="flex gap-2">
//                 <input
//                   type="time"
//                   value={editData.startTime}
//                   onChange={(e) => setEditData({...editData, startTime: e.target.value})}
//                 />
//                 <input
//                   type="time"
//                   value={editData.endTime}
//                   onChange={(e) => setEditData({...editData, endTime: e.target.value})}
//                 />
//               </div>
//               <button onClick={() => saveEdit(task.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
//             </div>
//           ) : (
//             /* --- DISPLAY MODE UI (Your existing code) --- */
//             <>
//               <div>
//                 <h2 className="text-xl font-bold">{task.title}</h2>
//                 <p className="text-gray-600">{task.startTime} to {task.endTime}</p>
//               </div>
//               {/* ... your existing menu buttons ... */}
//               <button onClick={() => startEditing(task)}>edit</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
