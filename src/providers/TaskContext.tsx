import { createContext, ReactNode, useState } from 'react';

interface ProviderProps {
    children: ReactNode;
}

interface TasksContextData {
    tasks: Tasks[];
    handleToggleTaskCompletion: (taskGroupId: number, taskId: number) => void;
    handleToggleAllTaskCompletion: (id: number) => void;
}

interface Tasks {
    title: string;
    body: {
        task: string;
        isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
}

const data = [
    { // topic
        title: 'Boas vindas às tarefas',
        body: [
            {
                task: 'Tarefa 1',
                isCompleted: false
            },

            {
                task: 'Tarefa 2',
                isCompleted: false
            }
        ],
        
        isAllCompleted: false
    },

    {
        title: 'Apenas testando',
        body: [
            {
                task: 'Tarefa de teste 1',
                isCompleted: false
            },

            {
                task: 'Tarefa de teste 2',
                isCompleted: false
            }
        ],
        
        isAllCompleted: false
    },
    {
        title: 'Apenas testando3',
        body: [
            {
                task: 'Tarefa de teste 1',
                isCompleted: false
            },

            {
                task: 'Tarefa de teste 2',
                isCompleted: false
            }
        ],
        
        isAllCompleted: false
    }

]

export const TasksContext = createContext<TasksContextData>({} as TasksContextData);

export function Provider({ children } : ProviderProps) {
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
        currentTasks[id].body.map((task, id) => task.isCompleted = !task.isCompleted)    

        setTasks([
            ...currentTasks,
        ])
    }

    return (
        <TasksContext.Provider value={{ tasks, handleToggleTaskCompletion, handleToggleAllTaskCompletion } }>
            {children}
        </TasksContext.Provider>
    )   
}