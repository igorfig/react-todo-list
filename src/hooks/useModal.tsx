import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextData {
    isTaskModalOpen: boolean;
    handleToggleTaskModal: () => void;
    isDeleteTaskModalOpen: boolean;
    handleToggleDeleteTaskModal: () => void;
    handleSetCurrentTaskId: (id: string) => void;
    handleSetCurrentDeleteTaskId: (id: string) => void;
    currentTaskId: string;
    currentDeleteTaskId: string;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps)  {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [currentDeleteTaskId, setCurrentDeleteTaskId] = useState('');

    function handleToggleTaskModal() {
        setIsTaskModalOpen(prevState => !prevState)
    }

    function handleSetCurrentTaskId(id: string) {
        setCurrentTaskId(id)
    }

    function handleSetCurrentDeleteTaskId(id: string) {
        setCurrentDeleteTaskId(id)
    }

    function handleToggleDeleteTaskModal() {
        setIsDeleteTaskModalOpen(prevState => !prevState)
    }


    return (
        <ModalContext.Provider value={
            {
                currentTaskId,
                currentDeleteTaskId,
                handleSetCurrentDeleteTaskId,
                handleSetCurrentTaskId,
                isTaskModalOpen, 
                handleToggleTaskModal, 
                isDeleteTaskModalOpen, 
                handleToggleDeleteTaskModal
            }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);

    return context;
}