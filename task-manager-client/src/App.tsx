import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Boards from '../components/Boards';
import Modal from '../components/Modal';
import './App.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BoardDetails from '../components/BoardDetails';

export type BoardModalType =
  | { mode: 'add' }
  | { mode: 'edit'; boardId: string };

const queryClient = new QueryClient();

function App() {
  const [boardModalMode, setBoardModalMode] = useState<BoardModalType>({
    mode: 'add',
  });
  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Selected board state
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

  function handleOpenModal() {
    setBoardModalMode({ mode: 'add' });
    setIsModalOpen(true);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={boardModalMode}
      />
      <div className="flex h-screen w-full">
        <Sidebar
          currentBoardId={currentBoardId}
          onSelectBoard={setCurrentBoardId}
        />
        <div className="relative flex h-full w-full flex-col">
          <Header onOpenModal={handleOpenModal} />
          {!currentBoardId && (
            <Boards
              onSelectBoard={setCurrentBoardId}
              onChangeMode={setBoardModalMode}
              onOpenModal={() => setIsModalOpen(true)}
            />
          )}
          {currentBoardId && <BoardDetails currentBoardId={currentBoardId} />}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
