import { createContext, ReactNode, useContext, useState, useEffect} from "react";
interface ProviderProps {
  children: ReactNode;
}

interface TasksContextData {
  tasks: Tasks[];
  handleToggleTaskCompletion: (taskGroupId: number, taskId: number) => void;
  handleToggleAllTaskCompletion: (id: number) => void;
  handleChangeTaskName: (
    newName: string,
    id: number,
    taskBlockId: number
  ) => void;
  handleChangeTitleName: (
    newTitleName: string,
    taskBlockId: number
  ) => void;
  handleDeleteTaskBlock: (taskBlockId: number) => void;
  handleDeleteTask: (taskBlockId: number, taskId: number) => void;
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
  {
    // topic
    id: 0,
    title: "Boas vindas às tarefas",
    body: [
      {
        id: 0,
        task: "Para editar uma tarefa de texto, simplesmente toque nela",
        isCompleted: false,
      },

      {
        id: 1,
        task: "Crie algumas tarefas apenas digitando",
        isCompleted: false,
      },

      {
        id: 2,
        task: "Aqui você pode adicionar tarefas de texto e marca-las como conclúida",
        isCompleted: false,
      },
    ],

    isAllCompleted: false,
  },
];

const TasksContext = createContext<TasksContextData>({} as TasksContextData);

export function TaskProvider({ children }: ProviderProps) {
  const [tasks, setTasks] = useState<Tasks[]>(() => {
    const storagedItems = localStorage.getItem('@tasks');
    const itemsOnStorage = storagedItems ? JSON.parse(storagedItems) : data

    return itemsOnStorage
  });

  useEffect(() => localStorage.setItem('@tasks', JSON.stringify(tasks)), [tasks])
  
  // CRUD
  function handleToggleTaskCompletion(taskGroupId: number, taskId: number) {
    const currentTask = tasks;

    currentTask[taskGroupId].body[taskId].isCompleted =
      !currentTask[taskGroupId].body[taskId].isCompleted;
    // eslint-disable-next-line array-callback-return
    const tasksCompleted = currentTask[taskGroupId].body.filter(
      (task) => task.isCompleted
    );

    if (currentTask[taskGroupId].body.length === tasksCompleted.length) {
      currentTask[taskGroupId].isAllCompleted = true;
    } else {
      currentTask[taskGroupId].isAllCompleted = false;
    }

    setTasks([...currentTask]);
  }

  function handleToggleAllTaskCompletion(id: number) {
    const currentTasks = tasks;
    currentTasks[id].isAllCompleted = !currentTasks[id].isAllCompleted;

    if (currentTasks[id].isAllCompleted) {
      currentTasks[id].isAllCompleted = true;
      currentTasks[id].body.forEach((task) => (task.isCompleted = true));
    } else {
      currentTasks[id].isAllCompleted = false;
      currentTasks[id].body.forEach((task) => (task.isCompleted = false));
    }

    setTasks([...currentTasks]);
  }

  function handleChangeTitleName(newTitleName: string, taskBlockId: number) {
    const tasksUpdated = tasks.map(task => {
      if(taskBlockId === task.id) {
        return {
          ...task,
          title: newTitleName
        }
      }

      return task
    })

    setTasks(tasksUpdated);
  }

  function handleChangeTaskName(
    newName: string,
    id: number,
    taskBlockId: number
  ) {

    const changeTaskName = tasks[taskBlockId].body.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          task: newName,
        };
      }

      return task
    });

    const tasksUpdated = tasks.map(taskBlock => {
      if(taskBlock.id === taskBlockId) {
        return {
          ...taskBlock,
          body: changeTaskName
        }
      }

      return taskBlock
    })
    setTasks(tasksUpdated);
  }

  function handleDeleteTaskBlock(taskBlockId: number) {
    const tasksNotDeleted = tasks.filter(task => task.id !== taskBlockId);   

    const tasksUpdated = tasksNotDeleted.map((task, id) => ({
      ...task,
      id
    }));

    setTasks(tasksUpdated)
  }

  function handleDeleteTask(taskBlockId: number, taskId:number) {
    const tasksNotDeleted = tasks[taskBlockId].body.filter(task => task.id !== taskId);
   /*  const updatedId = tasksNotDeleted.map((task, id) => ({
      ...task,
      id
    })) */

    const tasksUpdated = tasks.map((task, id) => {
      if(taskBlockId === task.id) {
        return {
          ...task,
          body: tasksNotDeleted
        }
      }

      return task
    })

    setTasks(tasksUpdated);
    
    /* if(tasksNotDeleted.length === 0) {
      handleDeleteTaskBlock(taskBlockId)
    } */
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        handleToggleTaskCompletion,
        handleToggleAllTaskCompletion,
        handleChangeTaskName,
        handleChangeTitleName,
        handleDeleteTaskBlock,
        handleDeleteTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TasksContext);

  return context;
}
