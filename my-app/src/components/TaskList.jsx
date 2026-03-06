import { Link } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);

  if (tasks.length === 0) return <p>No tasks yet. Add one!</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <div className="text-center w-full mt-5 ">
        <Link to={"/create"}>Create task</Link>
      </div>
    </div>
  );
};
