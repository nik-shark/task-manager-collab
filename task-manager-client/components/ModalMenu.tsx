import { type Dispatch, type SetStateAction } from "react";
import { type BoardModalType } from "../src/App";

interface ModalMenuProps {
  onClose: () => void;
  boardId: string;
  top: number;
  left: number;
  onEdit: Dispatch<SetStateAction<BoardModalType>>;
  onDelete: (boardId: string) => void;
  isPending: boolean;
}

export default function ModalMenu({
  boardId,
  top,
  left,
  onEdit,
  onDelete,
  onClose,
  isPending,
}: ModalMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}></div>

      <div
        className={`absolute z-50 w-40 h-15 bg-amber-400 flex flex-col justify-between`}
        style={{
          top,
          left,
        }}
      >
        <button onClick={onClose} className="self-end px-2">
          X
        </button>
        <div className="flex justify-evenly items-center">
          <button
            className=" mb-1 bg-green-300 w-15"
            onClick={() => onEdit({ mode: "edit", boardId: boardId })}
            disabled={isPending}
          >
            Edit
          </button>
          <button
            className=" mb-1 bg-red-300 w-15"
            onClick={() => onDelete(boardId)}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
