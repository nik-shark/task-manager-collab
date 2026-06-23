import { type BoardType } from "../types/types";
import { type Dispatch, type SetStateAction } from "react";

interface BoardCardProps {
  board: BoardType;

  onOpenModal: (
    boardId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  onSelectBoard: Dispatch<SetStateAction<string | null>>;
}

export default function BoardCard({
  board,
  onOpenModal,
  onSelectBoard,
}: BoardCardProps) {
  return (
    <div
      className="flex justify-between items-center w-40 h-20 shadow-md border-b-2 bg-stone-300 px-4 rounded-2xl cursor-pointer"
      onClick={() => onSelectBoard(board.id)}
    >
      <h2 className="text-2xl text-stone-800">{board.title}</h2>
      <button
        className="shadow-md w-5 text-center hover:bg-stone-700 hover:text-stone-100"
        onClick={(e) => onOpenModal(board.id, e)}
      >
        ...
      </button>
    </div>
  );
}
