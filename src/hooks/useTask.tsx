import { v4 as uuidv4 } from 'uuid';
import { createContext, ReactNode, useContext, useState, useEffect} from "react";
interface ProviderProps {
  children: ReactNode;
}
interface TasksContextData {
  tasks: Tasks[];
  toggleAllTaskCompletion: (id: string) => void;
  toggleTaskCompletion: (taskGroupId: string, taskId: string) => void;
  changeTitleName: (
    newTitleName: string,
    taskBlockId: string
  ) => void;
  changeTaskName: (
    newName: string,
    id: string,
    taskBlockId: string
  ) => void;
  deleteTaskBlock: (taskBlockId: string) => void;
  deleteTask: (taskBlockId: string, taskId: string) => void;
}

interface Tasks {
  id: string;
  title: string;
  body: {
    id: string;
    task: string;
    isCompleted: boolean;
  }[];

  isAllCompleted: boolean;
}


const data = [
  {
    // topic
    id: uuidv4(),
    title: "Boas vindas às tarefas",
    body: [
      {
        id: uuidv4(),
        task: "Para editar uma tarefa de texto, simplesmente toque nela",
        isCompleted: false,
      },

      {
        id: uuidv4(),
        task: "Crie algumas tarefas apenas digitando",
        isCompleted: false,
      },

      {
        id: uuidv4(),
        task: "Aqui você pode adicionar tarefas de texto e marca-las como conclúida",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        task: "Crie algumas tarefas apenas digitando",
        isCompleted: false,
      },

      {
        id: uuidv4(),
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
  function toggleTaskCompletion(taskGroupId: string, taskId: string) {
    console.log(taskId, 'task')
    const getCurrentTask = tasks.filter(task => task.id === taskGroupId);

    const taskStatusSwitch = getCurrentTask[0].body.map(task => ({
      ...task,
      isCompleted: task.id === taskId ? !task.isCompleted : task.isCompleted
    }))

    const tasksCompleted = taskStatusSwitch.filter((task) => task.isCompleted);
    
    let isAllTasksCompleted: boolean;

    taskStatusSwitch.length === tasksCompleted.length ? isAllTasksCompleted = true : isAllTasksCompleted = false

    const tasksUpdated = tasks.map(task => ({
      ...task,
      isAllCompleted: isAllTasksCompleted,
      body: taskStatusSwitch
    }))
    
    setTasks([...tasksUpdated]);
  }

  function toggleAllTaskCompletion(id: string) {
    const getCurrentTask = tasks.filter(task => task.id === id);
    const allTasksStatusSwitch = getCurrentTask.map(task => ({
      ...task,
      isAllCompleted: !task.isAllCompleted
    }))

    if (allTasksStatusSwitch[0].isAllCompleted) {
      allTasksStatusSwitch[0].body.forEach(task => task.isCompleted = true);
    } else {
      allTasksStatusSwitch[0].body.forEach(task => task.isCompleted = false);
    }

    setTasks([...allTasksStatusSwitch]);
  }

  function changeTitleName(newTitleName: string, taskBlockId: string) {
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

  function changeTaskName(
    newName: string,
    id: string,
    taskBlockId: string
  ) {

    const currentTask = tasks.filter(task => task.id === taskBlockId);

    const newTaskName = currentTask[0].body.map((task) => {
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
          body: newTaskName
        }
      }

      return taskBlock
    })
    setTasks(tasksUpdated);
  }

  function deleteTaskBlock(taskBlockId: string) {
    const tasksNotDeleted = tasks.filter(task => task.id !== taskBlockId);   

    const tasksUpdated = tasksNotDeleted.map((task) => ({
      ...task,
      id: uuidv4(),
    }));

    setTasks(tasksUpdated)
  }

  function deleteTask(taskBlockId: string, taskId: string) {
    const getCurrentTask = tasks.filter(task => task.id === taskBlockId);
    const tasksNotDeleted = getCurrentTask[0].body.filter(task => task.id !== taskId);
    const formatId = tasksNotDeleted.map((task) => ({
      ...task,
      id: uuidv4(),
    }))
    const tasksUpdated = tasks.map((task) => {
      if(taskBlockId === task.id) {
        return {
          ...task,
          body: formatId
        }
      }

      return task
    })

    setTasks(tasksUpdated);
  }
  
  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleAllTaskCompletion,
        toggleTaskCompletion,
        changeTaskName,
        changeTitleName,
        deleteTaskBlock,
        deleteTask
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
