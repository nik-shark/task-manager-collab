import { type BoardType } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";
import TaskColumn from "../components/TaskColumn";

interface BoardDetailsProps {
  currentBoardId: string;
}

export default function BoardDetails({ currentBoardId }: BoardDetailsProps) {
  const queryClient = useQueryClient();

  const boards = queryClient.getQueryData<BoardType[]>(["boards"]);
  const currentBoard = boards?.find((b) => b.id === currentBoardId);

  if (!currentBoard) {
    return <p>Board isn't found</p>;
  }

  const tasks = currentBoard.tasks || [];

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl border-b-2 mb-4">{currentBoard.title}</h1>
      <div className="flex gap-4 items-start overflow-x-auto h-full">
        <TaskColumn
          title="To Do"
          columnIndex={0}
          tasks={tasks.filter((t) => t.status === "todo")}
        />
        <TaskColumn
          title="In Progress"
          columnIndex={1}
          tasks={tasks.filter((t) => t.status === "in-progress")}
        />
        <TaskColumn
          title="Done"
          columnIndex={2}
          tasks={tasks.filter((t) => t.status === "done")}
        />
      </div>
    </div>
  );
}
