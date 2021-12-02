import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useModal } from "../../hooks/useModal";
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
  
  const limitedChar =
  task.task.length < 60 ? task.task : task.task.substr(0, 60) + "...";
  
  const taskRef = useRef(`${isCharLimited ? limitedChar : task.task}`);
  const { currentTaskId } = useModal();
  const { changeTaskName, toggleTaskCompletion } =
  useTask();

  return (
    <Container>
        <Checkbox
          handleToggleTaskCompletion={() =>
            toggleTaskCompletion(taskBlockId, task.id)
          }
          className={task.isCompleted ? "checked" : ""}
        />
        <ContentEditable
          className={`contentEditable-container ${task.isCompleted ? 'checked' : ''}`}
          html={taskRef.current}
          disabled={task.isCompleted ? true : false || disabled}
          onChange={(event) => {
            changeTaskName(event.target.value, task.id, currentTaskId);
            taskRef.current = event.target.value;
            /* if (
              event.target.value.length === 4 ||
              event.target.value.length === 0
            ) {
              handleDeleteTask(currentTaskId, task.id);
            } */
          }}
        />
    </Container>
  );
}
