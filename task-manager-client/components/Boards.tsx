// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BoardType } from "../types/types";
import { getAllBoards, deleteBoard } from "../API/boards";
import BoardCard from "./BoardCard";
import { useState, type Dispatch, type SetStateAction } from "react";
import ModalMenu from "./ModalMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type BoardModalType } from "../src/App";

interface BoardsProps {
  onOpenModal: () => void;
  onChangeMode: Dispatch<SetStateAction<BoardModalType>>;
}
type ModalModeType =
  | { mode: "closed" }
  | { mode: "open"; boardId: string; top: number; left: number };

export default function Boards({ onOpenModal, onChangeMode }: BoardsProps) {
  const [modalMode, setModalMode] = useState<ModalModeType>({ mode: "closed" });
  const queryClient = useQueryClient();

  function handleModalOpen(
    boardId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setModalMode({
      boardId: boardId,
      mode: "open",
      top: rect.bottom + window.scrollY - 100,
      left: rect.right - 220,
    });
  }

  function handleModalClose() {
    setModalMode({ mode: "closed" });
  }

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery<BoardType[]>({
    queryKey: ["boards"],
    queryFn: () => getAllBoards(1), //! SEND MOCK USER ID
  });

  // const { mutate, isPending } = useMutation({
  //   mutationFn: deleteBoard,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["boards"] });
  //     handleModalClose();
  //   },
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: (boardId: string) => deleteBoard(boardId),

    //! IF BACK DOESN'T RETURN DELETED OBJECT USE ID FROM PARAMS, AS AUTO SECOND ARGUMENT OF "ON SUCCESS"
    onSuccess: (_, boardId) => {
      queryClient.setQueryData<BoardType[]>(["boards"], (oldBoards) => {
        return oldBoards
          ? oldBoards.filter((board) => board.id !== boardId)
          : [];
      });
      handleModalClose();
    },
  });

  function handleDeleteBoard(boardId: string) {
    mutate(boardId);
  }

  let content;

  if (isLoading) {
    content = <p>Loading boards...</p>;
  } else if (isError) {
    content = <p>Something went wrong. Try again later</p>;
  } else if (!boards) {
    content = <p>Placeholder</p>;
  } else if (boards.length === 0) {
    content = (
      <button
        className=" w-100 h-50 hover:text-stone-200 hover:bg-stone-700 rounded-4xl mx-4 shadow-md shadow-stone-600 p-10 m-auto text-3xl bg-stone-300"
        onClick={onOpenModal}
      >
        + Add first board
      </button>
    );
  } else {
    content = boards.map((board) => (
      <BoardCard onOpenModal={handleModalOpen} key={board.id} board={board} />
    ));
  }

  return (
    <main
      className={`w-full h-full bg-fuchsia-200 p-6 ${isLoading || isError || !boards || boards.length === 0 ? "grid place-items-center" : "grid grid-cols-1 md:grid-cols-3 gap-4 content-start"} `}
    >
      {modalMode.mode === "open" && (
        <ModalMenu
          isPending={isPending}
          boardId={modalMode.boardId}
          onEdit={(newMode) => {
            onChangeMode(newMode);
            handleModalClose();
            onOpenModal();
          }}
          onDelete={handleDeleteBoard}
          onClose={handleModalClose}
          top={modalMode.top}
          left={modalMode.left}
        />
      )}
      {content}
    </main>
  );
}
