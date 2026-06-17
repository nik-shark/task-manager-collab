interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  return (
    <header className="w-full bg-amber-200 h-20 flex items-center justify-end">
      <button
        className="rounded-xl mx-2 bg-stone-300 p-4 shadow-md shadow-stone-600 py-4 px-2 hover:text-stone-200 hover:bg-stone-700"
        onClick={onOpenModal}
      >
        + Add task
      </button>
      <button className=" hover:text-stone-200 hover:bg-stone-700 rounded-xl mx-4 shadow-md shadow-stone-600 py-4 px-2">
        ☰
      </button>
    </header>
  );
}
