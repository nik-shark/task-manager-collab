// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BoardType } from "../types/types";
import { getAllBoards } from "../API/boards";
import BoardCard from "./BoardCard";

interface BoardsProps {
  onOpenModal: () => void;
}

export default function Boards({ onOpenModal }: BoardsProps) {
  //   const [board, setBoard] = useState(null);

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery<BoardType[]>({
    queryKey: ["boards"],
    queryFn: getAllBoards,
  });

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
      <BoardCard key={`${board.title}-${board.id}`} board={board} />
    ));
  }

  return (
    <main
      className={`w-full h-full bg-fuchsia-200 p-6 ${isLoading || isError || !boards || boards.length === 0 ? "grid place-items-center" : "grid grid-cols-1 md:grid-cols-3 gap-4 content-start"} `}
    >
      {content}
    </main>
  );
}
