import { useRef, useImperativeHandle, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBoard } from "../API/boards";

export interface ModalHandle {
  open: () => void;
  close: () => void;
}
interface ModalProps {
  ref: React.Ref<ModalHandle> | null;
}

export default function Modal({ ref }: ModalProps) {
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  // Closing modal function
  // Reset input and lose
  function handleClose() {
    setNewBoardTitle("");
    dialogRef.current?.close();
  }

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => handleClose(),
  }));

  // DATA MUTATION FUNCTION
  const { mutate, isPending } = useMutation({
    mutationFn: createNewBoard,
    // When operation successfull force React Query download list of boards
    onSuccess: () => {
      // Update data by key "boards"
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      // Close and clean modal
      handleClose();
    },
  });

  // Sbmit form
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    mutate(newBoardTitle);
  }

  return (
    <dialog
      ref={dialogRef}
      className="self-center m-auto backdrop:bg-black/60
    w-56 h-40  bg-stone-300 rounded-2xl"
    >
      <div className="flex flex-col justify-between items-center h-full w-full">
        <h2 className="bg-sky-300 w-full text-center text-2xl">
          Add new board
        </h2>
        <input
          type="text"
          className=" border-b-2 border-stone-400 focus:border-b-stone-800 outline-none bg-stone-50"
          onChange={(e) => setNewBoardTitle(e.target.value)}
          value={newBoardTitle}
          placeholder="New board name"
          disabled={isPending}
        />
        <form method="dialog" className="w-full px-5" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full">
            <button
              className="mb-2 text-xl p-2 bg-amber-200 text-stone-800 hover:bg-amber-950 hover:text-stone-200 w-20 rounded-xl"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add"}
            </button>
            <button className="mb-2 text-xl p-2 bg-amber-200 text-stone-800 hover:bg-amber-950 hover:text-stone-200 w-20 rounded-xl">
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
