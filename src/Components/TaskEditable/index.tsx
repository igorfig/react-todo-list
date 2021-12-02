import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { useTask } from "../../hooks/useTask";
import { Checkbox } from "../UI/Checkbox";
import { Container } from "./styles";

interface TaskProps {
  task: {
    id: number;
    task: string;
    isCompleted: boolean;
  };
  taskBlockId: number;
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

  function handleChange(event: any) {
    setText(event.target.value);
    changeTaskName(event.target.value, task.id, taskBlockId);
    if (event.target.value === "<br>" ||event.target.value  === "<div><br></div>" ||event.target.value.length === 0) {
      deleteTask(taskBlockId, task.id);
    }
  }

  return (
    <Container>
      <Checkbox
        handleToggleTaskCompletion={() => toggleTaskCompletion(taskBlockId, task.id)}
        className={task.isCompleted ? "checked" : ""}
      />
      <ContentEditable
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
