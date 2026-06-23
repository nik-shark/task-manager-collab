import { type BoardType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getAllBoards } from "../API/boards";
import { type Dispatch, type SetStateAction } from "react";

interface SidebarProps {
  currentBoardId: string | null;
  onSelectBoard: Dispatch<SetStateAction<string | null>>;
}

export default function Sidebar({
  currentBoardId,
  onSelectBoard,
}: SidebarProps) {
  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery<BoardType[]>({
    queryKey: ["boards"],
    queryFn: () => getAllBoards(1),
  });

  let content;
  if (isLoading) {
    content = (
      <li>
        <p>Loading data...</p>
      </li>
    );
  } else if (isError) {
    content = (
      <li>
        <p>Error</p>
      </li>
    );
  } else if (!boards) {
    content = (
      <li>
        <p>Error</p>
      </li>
    );
  } else {
    content = boards.map((board: BoardType) => (
      <li
        key={`button-${board.id}-${board.title}`}
        className="flex flex-col justify-center"
      >
        <button
          className={`mx-auto my-2 w-30 rounded-b-lg hover:bg-amber-200 ${
            board.id === currentBoardId ? "bg-blue-500" : "bg-amber-500"
          }`}
          onClick={() => onSelectBoard(board.id)}
        >
          {board.title}
        </button>
      </li>
    ));
  }

  return (
    <aside className=" flex flex-col justify-between h-full w-50 bg-blue-200 items-center py-10">
      <div>
        <h2 className="text-2xl border-b-2 mb-4">My boards</h2>
        <ul className="boards">{content}</ul>
      </div>

      <div className="flex flex-col">
        <button>Settings</button>
        <button>Log out</button>
      </div>
    </aside>
  );
}
