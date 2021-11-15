import { createContext, ReactNode, useContext, useState } from 'react';

interface ProviderProps {
    children: ReactNode;
}

interface TasksContextData {
    tasks: Tasks[];
    handleToggleTaskCompletion: (taskGroupId: number, taskId: number) => void;
    handleToggleAllTaskCompletion: (id: number) => void;
    handleChangeTaskName: (newName: string, id: number) => void;
}

interface Tasks {
    id: number;
    title: string;
    body: {
        id: number;
        task: string;
        isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
}

const data = [
    { // topic
        id: 0,
        title: 'Boas vindas às tarefas',
        body: [
            {
                id: 0,
                task: 'Para editar uma tarefa de texto, simplesmente toque nela',
                isCompleted: false
            },

            {
                id: 1,
                task: 'Crie algumas tarefas apenas digitando',
                isCompleted: false
            },

            {
                id: 2,
                task: 'Aqui você pode adicionar tarefas de texto e marca-las como conclúida',
                isCompleted: false
            },
        ],
        
        isAllCompleted: false
    },
    { // topic
        id: 1,
        title: 'Tarefa 2',
        body: [
            {
                id: 0,
                task: 'Está tudo funcionando perfeitamente',
                isCompleted: false
            },

            {
                id: 1,
                task: 'Testando ',
                isCompleted: false
            },
            {
                id: 2,
                task: 'Testando 123 ',
                isCompleted: false
            },
        ],
        
        isAllCompleted: false
    },
]

const TasksContext = createContext<TasksContextData>({} as TasksContextData);

export function TaskProvider({ children } : ProviderProps) {
    const [tasks, setTasks] = useState<Tasks[]>(data);
    // CRUD
    function handleToggleTaskCompletion(taskGroupId: number, taskId: number) {
        const currentTask = tasks;

        currentTask[taskGroupId].body[taskId].isCompleted = !currentTask[taskGroupId].body[taskId].isCompleted
        // eslint-disable-next-line array-callback-return
        const tasksCompleted = currentTask[taskGroupId].body.filter(task => task.isCompleted)

        if(currentTask[taskGroupId].body.length  === tasksCompleted.length) {
            currentTask[taskGroupId].isAllCompleted = true;
        } else {
            currentTask[taskGroupId].isAllCompleted = false;
        }

        setTasks([
            ...currentTask,
        ]);
    }

    function handleToggleAllTaskCompletion(id: number) {
        const currentTasks = tasks;
        currentTasks[id].isAllCompleted = !currentTasks[id].isAllCompleted

        if(currentTasks[id].isAllCompleted) {
            currentTasks[id].isAllCompleted = true
            currentTasks[id].body.forEach(task => task.isCompleted = true)   
        } else {
            currentTasks[id].isAllCompleted = false
            currentTasks[id].body.forEach(task => task.isCompleted = false)   
        }

        setTasks([
            ...currentTasks,
        ])
    }

    function handleChangeTaskName(newName: string, id: number) {
        console.log(newName, id)
    }

    return (
        <TasksContext.Provider value={{ tasks, handleToggleTaskCompletion, handleToggleAllTaskCompletion, handleChangeTaskName } }>
            {children}
        </TasksContext.Provider>
    )   
}

export function useTask() {
    const context = useContext(TasksContext)
    
    return context
}