import { useTaskStore } from "../store/useTaskStore";

export const TaskItem = ({ task }) => {
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
        </div>
        <button onClick={() => removeTask(task.id)} style={{ color: "red" }}>
          Delete
        </button>
      </div>
    </>
  );
};
