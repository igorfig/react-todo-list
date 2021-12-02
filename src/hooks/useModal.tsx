import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextData {
    isTaskModalOpen: boolean;
    toggleTaskModal: () => void;
    isDeleteTaskModalOpen: boolean;
    toggleDeleteTaskModal: () => void;
    updateCurrentTaskId: (id: string) => void;
    updateCurrentDeleteTaskId: (id: string) => void;
    currentTaskId: string;
    currentDeleteTaskId: string;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps)  {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [currentDeleteTaskId, setCurrentDeleteTaskId] = useState('');

    function toggleTaskModal() {
        setIsTaskModalOpen(prevState => !prevState)
    }

    function updateCurrentTaskId(id: string) {
        setCurrentTaskId(id)
    }

    function updateCurrentDeleteTaskId(id: string) {
        setCurrentDeleteTaskId(id)
    }

    function toggleDeleteTaskModal() {
        setIsDeleteTaskModalOpen(prevState => !prevState)
    }


    return (
        <ModalContext.Provider value={
            {
                currentTaskId,
                currentDeleteTaskId,
                updateCurrentDeleteTaskId,
                updateCurrentTaskId,
                isTaskModalOpen, 
                toggleTaskModal, 
                isDeleteTaskModalOpen, 
                toggleDeleteTaskModal
            }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);

    return context;
}