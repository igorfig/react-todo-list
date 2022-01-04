import { createContext, ReactNode, useContext, useState } from 'react';
import { useTask } from './useTask';

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
    updateTasksSelected: (id: string) => void;
    updateCurrentTaskId: (id: string) => void;
    currentTaskId: string;
    currentTaskEditId: string;
    selectAllTasks: (isAllSelected: boolean) => void;
    tasksSelected: string[];
    unselectAllTasks: () => void;
    unselectTask: (id: string) => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps)  {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(''); 
    const [currentTaskEditId, setCurrentTaskEditId] = useState('');
    const [tasksSelected, setTasksSelected] = useState<string[]>([])

    const { tasks } = useTask();

    const openTaskModal = () => setIsTaskModalOpen(true);
    const openTaskEditModal = () => setIsTaskEditModalOpen(true);
    const requestClose = () => {
        setIsTaskModalOpen(false);
        setIsTaskEditModalOpen(false);
    }
    const updateCurrentTaskId = (id: string) => setCurrentTaskId(id);
    const updateCurrentTaskEditId = (id: string) => setCurrentTaskEditId(id);
    const updateTasksSelected = (id: string) => {
            if(!tasksSelected.includes(id)) {
                setTasksSelected([
                    ...tasksSelected,  
                    id
                ])    
            }
            console.log(tasksSelected);
    };

    const unselectTask = (id: string) => {
        const ids = tasksSelected.filter(taskId => taskId !== id);

        setTasksSelected(ids);
    }

    const selectAllTasks = (isAllSelected: boolean) => {
        const arrOfId = tasks.map(task => task.id)

        isAllSelected ? setTasksSelected([]) :setTasksSelected(arrOfId);
    }

    const unselectAllTasks = () => setTasksSelected([]);
    const toggleDeleteTaskModal = () => setIsDeleteTaskModalOpen(prevState => !prevState)

    return (
        <ModalContext.Provider value={
            {
                openTaskModal,
                unselectTask,
                selectAllTasks,
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
                updateTasksSelected,
                tasksSelected,
                unselectAllTasks
            }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);

    return context;
}