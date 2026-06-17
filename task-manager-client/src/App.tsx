import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Boards from '../components/Boards';
import Modal from '../components/Modal';
import './App.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        <Sidebar />
        <div className="relative flex h-full w-full flex-col">
          <Header onOpenModal={handleOpenModal} />
          <Boards
            onChangeMode={setBoardModalMode}
            onOpenModal={() => setIsModalOpen(true)}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
