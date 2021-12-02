import { createContext, ReactNode, useContext, useState, useEffect} from "react";
interface ProviderProps {
  children: ReactNode;
}

interface TasksContextData {
  tasks: Tasks[];
  toggleAllTaskCompletion: (id: number) => void;
  toggleTaskCompletion: (taskGroupId: number, taskId: number) => void;
  changeTitleName: (
    newTitleName: string,
    taskBlockId: number
  ) => void;
  changeTaskName: (
    newName: string,
    id: number,
    taskBlockId: number
  ) => void;
  deleteTaskBlock: (taskBlockId: number) => void;
  deleteTask: (taskBlockId: number, taskId: number) => void;
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

const generateKey = () => Math.floor(Math.random() * 1000 + 1);

const data = [
  {
    // topic
    id: generateKey(),
    title: "Boas vindas às tarefas",
    body: [
      {
        id: generateKey(),
        task: "Para editar uma tarefa de texto, simplesmente toque nela",
        isCompleted: false,
      },

      {
        id: generateKey(),
        task: "Crie algumas tarefas apenas digitando",
        isCompleted: false,
      },

      {
        id: generateKey(),
        task: "Aqui você pode adicionar tarefas de texto e marca-las como conclúida",
        isCompleted: false,
      },
      {
        id: generateKey(),
        task: "Crie algumas tarefas apenas digitando",
        isCompleted: false,
      },

      {
        id: generateKey(),
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
  function toggleTaskCompletion(taskGroupId: number, taskId: number) {
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

  function toggleAllTaskCompletion(id: number) {
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

  function changeTitleName(newTitleName: string, taskBlockId: number) {
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
    id: number,
    taskBlockId: number
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

  function deleteTaskBlock(taskBlockId: number) {
    const tasksNotDeleted = tasks.filter(task => task.id !== taskBlockId);   

    const tasksUpdated = tasksNotDeleted.map((task) => ({
      ...task,
      id: generateKey(),
    }));

    setTasks(tasksUpdated)
  }

  function deleteTask(taskBlockId: number, taskId:number) {
    const getCurrentTask = tasks.filter(task => task.id === taskBlockId);
    const tasksNotDeleted = getCurrentTask[0].body.filter(task => task.id !== taskId);
    const formatId = tasksNotDeleted.map((task) => ({
      ...task,
      id: generateKey(),
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
