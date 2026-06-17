import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Boards from '../components/Boards';
import Modal from '../components/Modal';
import './App.css';
import { type ModalHandle } from '../components/Modal';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const dialog = useRef<ModalHandle>(null);

  function handleOpenModal() {
    if (!dialog.current) return;
    dialog.current.open();
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Modal ref={dialog} />
        <div className="flex h-screen w-full">
          <Sidebar />
          <div className="flex h-full w-full flex-col">
            <Header onOpenModal={handleOpenModal} />
            <Boards onOpenModal={handleOpenModal} />
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
