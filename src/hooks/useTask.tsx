import { v4 as uuidv4 } from 'uuid';
import { createContext, ReactNode, useContext, useState, useEffect} from "react";
interface ProviderProps {
  children: ReactNode;
}
interface TasksContextData {
  tasks: Tasks[];
  createNewTaskBlock: () => void;
  createNewTask: (id: string) => void;
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
  deleteTaskBlock: (taskBlockId: string[]) => void;
  deleteTask: (taskBlockId: string, taskId: string) => void;
  handleToggleTasks: (id: string) => void;
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
  isHide: boolean;
}

const data = [
  {
    // topic
    id: uuidv4(),
    title: "Boas vindas às tarefas",
    body: [
      {
        id: uuidv4(),
        task: "Aqui há um breve guia de como utilizar esta aplicação!",
        isCompleted: false,
      },

      {
        id: uuidv4(),
        task: "Para editar uma tarefa de texto, simplesmente toque nela",
        isCompleted: false,
      },

      {
        id: uuidv4(),
        task: "Você pode marcar suas tarefas como concluída tocando na caixa de seleção",
        isCompleted: false,
      },


      {
        id: uuidv4(),
        task: 'É possível adicionar novas tarefas ao pressionar a tecla/botão de quebra de linha padrão do sistema na última tarefa criada',
        isCompleted: false,
      },
    ],
    isAllCompleted: false,
    isHide: false
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
  
  const handleToggleTasks = (id: string) => {
    const tasksUpdated = tasks.map(task => {
      if(task.id === id) {
        return {
          ...task,
          isHide: !task.isHide
        }
      }

      return task
    })

    setTasks(tasksUpdated);
  };

  // CRUD
  function createNewTaskBlock() {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: "Comece adicionando um título",
        body: [
          {
            id: uuidv4(),
            task: "Você adicionar mais tarefas como esta!",
            isCompleted: false,
          },
        ],
        isAllCompleted: false,
        isHide: false
      }
    ])
  }

  function createNewTask(id: string ) {
    const currentTask = tasks.filter(task => task.id === id);
    const taskSaved = currentTask.map(task => ({
        ...task,
        body: [
          ...task.body,
          {
            id: uuidv4(),
            task: '',
            isCompleted: false
          }
        ]
    }))

    const tasksUpdated = tasks.map(task => {
      if(task.id === id) {
        return taskSaved[0]
      }

      return task
    })
    
    setTasks(tasksUpdated)

  }

  function toggleAllTaskCompletion(id: string) {
    const currentTask = tasks.filter(task => task.id === id);
    const allTasksStatusSwitch = currentTask.map(task => ({
      ...task,
      isAllCompleted: !task.isAllCompleted
    }))

    const tasksUpdated = tasks.map(task => {
      if(task.id === id) {
        return allTasksStatusSwitch[0]       
      }

      return task
    })

    if (allTasksStatusSwitch[0].isAllCompleted) {
      allTasksStatusSwitch[0].body.forEach(task => task.isCompleted = true);
    } else {
      allTasksStatusSwitch[0].body.forEach(task => task.isCompleted = false);
    }

    setTasks(tasksUpdated);
  }

  function toggleTaskCompletion(taskGroupId: string, taskId: string) {
    console.log(taskId, 'task')
    const currentTask = tasks.filter(task => task.id === taskGroupId);

    const taskStatusSwitched = currentTask[0].body.map(task => ({
      ...task,
      isCompleted: task.id === taskId ? !task.isCompleted : task.isCompleted
    }))

    const tasksCompleted = taskStatusSwitched.filter((task) => task.isCompleted);
    
    let isAllTasksCompleted: boolean;

    taskStatusSwitched.length === tasksCompleted.length ? isAllTasksCompleted = true : isAllTasksCompleted = false

    const tasksUpdated = tasks.map(task => {
      if(task.id === taskGroupId) {
        return {
          ...task,
          isAllCompleted: isAllTasksCompleted,
          body: taskStatusSwitched
        }
      }

      return task
    })
    
    setTasks(tasksUpdated);
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
    console.log(tasks, id,  'currentTask');
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

  function deleteTaskBlock(taskBlockId: string[]) {
    const tasksNotDeleted = tasks.filter((task) => !taskBlockId.includes(task.id));   

    const tasksUpdated = tasksNotDeleted.map((task) => ({
      ...task,
      id: uuidv4(),
    }));

    setTasks(tasksUpdated)
  }

  function deleteTask(taskBlockId: string, taskId: string) {
    const currentTask = tasks.filter(task => task.id === taskBlockId);
    const tasksNotDeleted = currentTask[0].body.filter(task => task.id !== taskId);
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
        handleToggleTasks,
        createNewTaskBlock,
        createNewTask,
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
