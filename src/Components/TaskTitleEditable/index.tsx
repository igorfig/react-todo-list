import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { toast, ToastContainer } from "react-toastify";
import { useTask } from "../../hooks/useTask";
import { Task } from "../../types";
import { Checkbox } from "../UI/Checkbox";
import { Container } from "./styles";

interface TaskTitleProps {
  task: Task;
  disabled: boolean;
  isCharLimited?: boolean;
}

export function TaskTitle({ task, disabled, isCharLimited }: TaskTitleProps) {
  const { changeTitleName, toggleAllTaskCompletion, createNewTask } = useTask();
  const taskTitleRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [title, setTitle] = useState(() => {
    if (isCharLimited) {
      if (window.screen.width <= 500) {
        if (task.title.length < 25) {
          return task.title;
        } else {
          return task.title.substr(0, 25) + "...";
        }
      } else {
        if(task.title.length < 50) {
          return task.title;
        } else {
          return task.title.substr(0, 50) + "...";
        }
      }
    } else {
      return task.title;
    }
  });

  const prevTaskTitleRef = useRef(task.title);

  function handleCreateNewTask(event: any) {
    if (event.key === "Enter") {
      event.preventDefault();
      task.body.length === 0 && createNewTask(task.id);
    }
  }

  useEffect(() => {
    taskTitleRef.current.addEventListener("keydown", handleCreateNewTask);

    const ref = taskTitleRef.current;
    return () => ref.removeEventListener("keydown", handleCreateNewTask);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  function handleChange(event: any) {
    setTitle(event.target.value);
    if (
      event.target.value !== "<br>" &&
      event.target.value !== "<div><br></div>" &&
      event.target.value.length > 0
    ) {
      changeTitleName(event.target.value, task.id);
    } else {
      changeTitleName(prevTaskTitleRef.current, task.id); // mobile doesn't work without this
    }

    if (
      event.target.value === "<br>" ||
      event.target.value === "<div><br></div>" ||
      event.target.value.length === 0
    ) {
      toast.warn("Você precisa adicionar um título à suas tarefas!");
    }
  }

  return (
    <Container>
      <Checkbox
        handleToggleTaskCompletion={() => {
          toggleAllTaskCompletion(task.id);
        }}
        className={task.isAllCompleted ? "checked" : ""}
      />
      <ContentEditable
        tabIndex={1}
        innerRef={taskTitleRef}
        className={`contentEditable-title ${
          task.isAllCompleted ? "checked" : ""
        }`}
        html={title}
        disabled={task.isAllCompleted ? true : false || disabled}
        onChange={handleChange}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </Container>
  );
}
