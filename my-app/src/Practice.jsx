import { useState } from "react";
import { useTaskStore } from "./practice/store";

const Practice = () => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const [tasks, setTasks] = useState([
    { id: 1, name: "react", category: "tech" },
    { id: 2, name: "html", category: "technology" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const startEditing = (task) => {
    setEditingId(task.id);
    setFormData({
      name: task.name,
      category: task.category,
    });
  };

  // updateTask: (taskId, title, startTime, endTime, category) =>
  //   set((state) => ({
  //     tasks: state.tasks.map((task) =>
  //       task.id === taskId
  //         ? { ...task, title, startTime, endTime, category }
  //         : task,
  //     ),
  //   })),

    const updateTheTask = (id) => {
      tasks.map(task => {
       return task.id = id ? {...tasks, formData}
      })
    }








  const handleSaveEdit = (id) => {
    // const newTask = {
    //   ...formData,
    //   id,
    //   completed: false,
    // };
    updateTask(id, formData.name, formData.category);
  };

  const [editingId, setEditingId] = useState(null);
  const [activeModalId, setActiveModalId] = useState(null);
  // const [filters, setFilters] = useState("all");

  // const filteredTasks = tasks.map((task) => {
  //   const categoryMatch = task.category;
  //   const searchMatch = "";

  //   return categoryMatch && searchMatch;
  // });
  return (
    <div>
      <h2></h2>
      {tasks.map((task) => (
        <div className="relative">
          <div
            key={task.id}
            className="flex justify-between p-1 border rounded"
          >
            <h2>{task.name}</h2>
            <button onClick={() => setActiveModalId(task.id)}>more</button>
          </div>

          {activeModalId === task.id && (
            <div className="modal-btns absolute top-1 right-15 flex flex-col gap-2 bg-white z-10 w-40 border items-start p-2">
              <button onClick={() => startEditing(task)}>edit</button>
              <button>save</button>
              <button>delete</button>
            </div>
          )}

          {/* handle editing */}
          {editingId === task.id && (
            <div className="p-2 border rounded bg-white">
              <h2 className="text-blue-500 text-md">Editing a task...</h2>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="p-1 border rounded border-gray-300"
                />
              </div>

              <div>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  name="category"
                  id="category"
                >
                  <option value="all">All Tasks</option>
                  <option value="tech">All</option>
                  <option value="technology">All</option>
                </select>
              </div>
              <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              <button onClick={() => updateTheTask(task.id)}>Update</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Practice;
