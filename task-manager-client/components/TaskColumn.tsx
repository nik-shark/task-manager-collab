import TaskCard from "./TaskCard";
import { type TaskType } from "../types/types";

interface TaskColumnProps {
  columnIndex: number;
  tasks: TaskType[];
  title: string;
}

export default function TaskColumn({
  tasks,
  title,
  columnIndex,
}: TaskColumnProps) {
  return (
    <div className="w-70 bg-amber-100">
      <div className="header flex justify-between items-center ">
        <div className="flex">
          <h2>{title}</h2>
          <div className="ml-3">0</div>
        </div>
        <button className="cursor-pointer bg-stone-400 hover:bg-amber-300 p-2 ">
          + Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li>
            <TaskCard task={task} columnIndex={columnIndex} />
          </li>
        ))}
      </ul>
    </div>
  );
}
