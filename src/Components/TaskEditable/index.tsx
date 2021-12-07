import {  useRef, useState } from "react";
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
  const { changeTaskName, toggleTaskCompletion, deleteTask }  = useTask();
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
  
  function handleDeleteTaskOnBackspacePress(event: any) {
    event.stopPropagation();
    if(event.key === 'Backspace') {
      deleteTask(taskBlockId, task.id);
    }
  }

  function handleChange(event: any) {
    setText(event.target.value);
    changeTaskName(event.target.value, task.id, taskBlockId);
    if (event.target.value === "<br>" ||event.target.value  === "<div><br></div>" ||event.target.value.length === 0) {
      contentEditableRef.current.addEventListener('keydown', handleDeleteTaskOnBackspacePress)
    }
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
