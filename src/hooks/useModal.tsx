import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextData {
    isTaskModalOpen: boolean;
    handleToggleTaskModal: () => void;
    isDeleteTaskModalOpen: boolean;
    handleToggleDeleteTaskModal: () => void;
    handleSetCurrentTaskId: (id: number) => void;
    currentTaskId: number;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps)  {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(0);

    function handleToggleTaskModal() {
        setIsTaskModalOpen(prevState => !prevState)
    }

    function handleSetCurrentTaskId(id: number) {
        setCurrentTaskId(id)
    }

    function handleToggleDeleteTaskModal() {
        setIsDeleteTaskModalOpen(prevState => !prevState)
    }


    return (
        <ModalContext.Provider value={
            {
                currentTaskId,
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