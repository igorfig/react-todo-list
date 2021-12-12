import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextData {
    openTaskModal: () => void;
    requestClose: () => void;
    isTaskModalOpen: boolean;
    isTaskEditModalOpen: boolean;
    openTaskEditModal: () => void;
    isDeleteTaskModalOpen: boolean;
    toggleDeleteTaskModal: () => void;
    updateCurrentTaskEditId: (id: string) => void;
    updateCurrentDeleteTaskId: (id: string) => void;
    updateCurrentTaskId: (id: string) => void;
    currentTaskId: string;
    currentTaskEditId: string;
    currentDeleteTaskId: string;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps)  {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(''); 
    const [currentTaskEditId, setCurrentTaskEditId] = useState('');
    const [currentDeleteTaskId, setCurrentDeleteTaskId] = useState('');

    const openTaskModal = () => setIsTaskModalOpen(true);
    const openTaskEditModal = () => setIsTaskEditModalOpen(true);
    const requestClose = () => {
        setIsTaskModalOpen(false);
        setIsTaskEditModalOpen(false);
    }
    const updateCurrentTaskId = (id: string) => setCurrentTaskId(id);
    const updateCurrentTaskEditId = (id: string) => setCurrentTaskEditId(id);
    const updateCurrentDeleteTaskId = (id: string) => setCurrentDeleteTaskId(id);
    const toggleDeleteTaskModal = () => setIsDeleteTaskModalOpen(prevState => !prevState)

    return (
        <ModalContext.Provider value={
            {
                openTaskModal,
                isTaskModalOpen,
                updateCurrentTaskId,
                currentTaskId,
                openTaskEditModal, 
                isTaskEditModalOpen, 
                requestClose,
                isDeleteTaskModalOpen, 
                toggleDeleteTaskModal,
                updateCurrentTaskEditId,
                currentTaskEditId,
                updateCurrentDeleteTaskId,
                currentDeleteTaskId,
            }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);

    return context;
}