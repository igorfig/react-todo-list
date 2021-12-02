import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextData {
    isTaskModalOpen: boolean;
    toggleTaskModal: () => void;
    isDeleteTaskModalOpen: boolean;
    toggleDeleteTaskModal: () => void;
    updateCurrentTaskId: (id: number) => void;
    updateCurrentDeleteTaskId: (id: number) => void;
    currentTaskId: number;
    currentDeleteTaskId: number;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps)  {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(0);
    const [currentDeleteTaskId, setCurrentDeleteTaskId] = useState(0);

    function toggleTaskModal() {
        setIsTaskModalOpen(prevState => !prevState)
    }

    function updateCurrentTaskId(id: number) {
        setCurrentTaskId(id)
    }

    function updateCurrentDeleteTaskId(id: number) {
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