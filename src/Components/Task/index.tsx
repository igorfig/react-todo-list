import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useModal } from "../../hooks/useModal";
import { useTask } from "../../hooks/useTask";
import { Checkbox } from "../UI/Checkbox";

interface TaskProps {
  task: {
    id: number;
    task: string;
    isCompleted: boolean;
  };
  disabled: boolean;
  isCharLimited: boolean
}

export function Task({ task, disabled, isCharLimited }: TaskProps) {
  const limitedChar = task.task.length < 60 ? task.task : task.task.substr(0, 60) + "..."

  const taskRef = useRef(
    `${isCharLimited ? limitedChar : task.task}`
  );
  const { currentTaskId } = useModal();
  const { handleChangeTaskName, handleToggleTaskCompletion } = useTask();

  return (
    <>
        <Checkbox
            handleToggleTaskCompletion={() =>
            handleToggleTaskCompletion(currentTaskId, task.id)
            }
            className={task.isCompleted ? "checked" : ""}
        />
      <span className={`row content-row ${task.isCompleted ? "checked" : ""}`}>
        <ContentEditable
          className="contentEditable-container"
          html={taskRef.current}
          disabled={task.isCompleted ? true : false || disabled}
          onChange={(event) => {
            handleChangeTaskName(event.target.value, task.id, currentTaskId);
            taskRef.current = event.target.value;
            if(event.target.value === '<br>' || event.target.value === '') {
              // delete task on writing
              // with several bugs
            }
          }}
        />
      </span>
    </>
  );
}
