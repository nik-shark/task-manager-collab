import TaskCard from "./TaskCard";

export type TaskType = {
  title: string;
  id: string;
  board_id: string;
  description: string;
  created_at: string;
  changed_at: string;
  status: string;
  deadline: string;
};

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
    <div>
      <div className="header flex">
        <div>
          <h2>{title}</h2>
          <div>COUNTER</div>
        </div>
        <button>+ Add</button>
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
