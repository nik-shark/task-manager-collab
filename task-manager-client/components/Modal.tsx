import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBoard, editBoard } from "../API/boards";
import { type BoardModalType } from "../src/App";
import { type BoardType } from "../types/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: BoardModalType;
}

export default function Modal({ isOpen, onClose, mode }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  // Using native dialog methods
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  // Getting boards from chache
  const cachedBoards = queryClient.getQueryData<BoardType[]>(["boards"]);
  const currentBoard =
    mode.mode === "edit"
      ? cachedBoards?.find((board) => board.id === mode.boardId)
      : null;
  // Boards states
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [prevBoardId, setPrevBoardId] = useState<string | null>(null);
  const [prevMode, setPrevMode] = useState<"add" | "edit">("add");

  // checking for mode
  const currentId = mode.mode === "edit" ? mode.boardId : null;

  if (currentId !== prevBoardId || mode.mode !== prevMode) {
    // If switched to editing mode force to use its name
    setNewBoardTitle(currentBoard ? currentBoard.title : "");
    // Save current params
    setPrevBoardId(currentId);
    setPrevMode(mode.mode);
  }

  //! Mutations
  // Create new Board
  const createMutation = useMutation({
    mutationFn: createNewBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      onClose();
    },
  });
  // Edit Board
  const editMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      editBoard(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      onClose();
    },
  });

  const isPending = createMutation.isPending || editMutation.isPending;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    if (mode.mode === "edit") {
      editMutation.mutate({ id: mode.boardId, title: newBoardTitle });
    } else {
      createMutation.mutate(newBoardTitle);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="self-center m-auto backdrop:bg-black/60 w-56 h-40 bg-stone-300 rounded-2xl p-0 overflow-hidden"
    >
      {isOpen && (
        <form
          className="flex flex-col justify-between items-center h-full w-full pb-3"
          onSubmit={handleSubmit}
        >
          <h2 className="bg-sky-300 w-full text-center text-2xl py-1">
            {mode.mode === "edit" ? "Edit board" : "Add new board"}
          </h2>

          <input
            type="text"
            className="border-b-2 border-stone-400 focus:border-b-stone-800 outline-none bg-stone-50 px-2 py-0.5 w-4/5"
            onChange={(e) => setNewBoardTitle(e.target.value)}
            value={newBoardTitle}
            placeholder="New board name"
            disabled={isPending}
          />

          <div className="flex justify-between w-full px-5">
            <button
              className="mb-2 text-xl p-2 bg-amber-200 text-stone-800 hover:bg-amber-950 hover:text-stone-200 w-20 rounded-xl disabled:opacity-50"
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? mode.mode === "edit"
                  ? "Saving..."
                  : "Adding..."
                : mode.mode === "edit"
                  ? "Save"
                  : "Add"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mb-2 text-xl p-2 bg-amber-200 text-stone-800 hover:bg-amber-950 hover:text-stone-200 w-20 rounded-xl"
            >
              Close
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
