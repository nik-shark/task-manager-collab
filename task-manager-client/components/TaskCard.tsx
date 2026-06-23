import type { TaskType } from "./TaskColumn";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
interface TaskCardProps {
  columnIndex: number;
  task: TaskType;
}

export default function TaskCard({ task, columnIndex }: TaskCardProps) {
  return (
    <div className="border-2 border-red-500 w-10 h-40">
      <div>
        <h2>{task.title}</h2>
      </div>
      <p>{task.description}</p>
      <div className="footer flex justify-between">
        {columnIndex > 0 && <button>⬅</button>}
        <p>
          <FaCalendarAlt />
          {task.deadline}
        </p>
        {columnIndex < 3 && <button>⮕</button>}
      </div>
    </div>
  );
}
