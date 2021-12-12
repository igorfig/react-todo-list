import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useTask } from "../../hooks/useTask";
import { Checkbox } from "../UI/Checkbox";
import { Container } from "./styles";

interface TaskProps {
  task: {
    id: string;
    task: string;
    isCompleted: boolean;
  };
  taskBlockId: string;
  disabled: boolean;
  isCharLimited: boolean;
}

export function Task({
  task,
  taskBlockId,
  disabled,
  isCharLimited,
}: TaskProps) {
  const { tasks, createNewTask, changeTaskName, toggleTaskCompletion, deleteTask }  = useTask();
  const [text, setText] = useState(() => {
    if (isCharLimited) {
      if (task.task.length < 60) {
        return task.task;
      } else {
        return task.task.substr(0, 60) + "...";
      }
    } else {
      return task.task;
    }
  });

  
  const contentEditableRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  useEffect(() => {
    contentEditableRef.current.focus()
  }, [])

  function handleCreateNewTask(event: any) {
      if(event.key === 'Enter' ) {
        event.preventDefault();
        const currentTask = tasks.filter(task => task.id === taskBlockId);

        if(text === currentTask[0].body[currentTask[0].body.length - 1].task && text.length > 0) {
          createNewTask(taskBlockId);
        }
      }
    }
  
  useEffect(() => {
    contentEditableRef.current.addEventListener('keydown', handleCreateNewTask)
    
    const ref = contentEditableRef.current
    return () => ref.removeEventListener('keydown', handleCreateNewTask)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, tasks])

  function handleDeleteTaskOnBackspacePress(event: any) {
    if (text === "<br>" || text  === "<div><br></div>" || text.length  === 0) {
      if(event.key === 'Backspace') {
        deleteTask(taskBlockId, task.id);
        console.log(tasks)
        console.log(task.id);
      }
    }
  }
  useEffect(() => {
    contentEditableRef.current.addEventListener('keydown', handleDeleteTaskOnBackspacePress)
    const ref = contentEditableRef.current

    return () => ref.removeEventListener('keydown', handleDeleteTaskOnBackspacePress);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, task])

  

  function handleChange(event: any) {
    setText(event.target.value);
    changeTaskName(event.target.value, task.id, taskBlockId);
  }

  return (
    <Container>
      <Checkbox
        handleToggleTaskCompletion={() => toggleTaskCompletion(taskBlockId, task.id)}
        className={task.isCompleted ? "checked" : ""}
      />
      <ContentEditable
        innerRef={contentEditableRef}
        tabIndex={1}
        className={`contentEditable-container ${
          task.isCompleted ? "checked" : ""
        }`}
        html={text}
        disabled={task.isCompleted ? true : false || disabled}
        onChange={handleChange}
      />
    </Container>
  );
}
