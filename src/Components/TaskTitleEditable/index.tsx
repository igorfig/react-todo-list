import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { toast, ToastContainer } from "react-toastify";
import { useTask } from "../../hooks/useTask";
import { Checkbox } from "../UI/Checkbox";
import { Container } from "./styles";

interface TaskTitleProps {
  task: {
    id: string;
    title: string;
    body: {
      id: string;
      task: string;
      isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
  };
  disabled: boolean;
}

export function TaskTitle({ task, disabled }: TaskTitleProps) {
  const { changeTitleName, toggleAllTaskCompletion } = useTask();
  const taskTitleRef = useRef(task.title);
  const prevTaskTitleRef = useRef(task.title);

  return (
    <Container >  
      <Checkbox
        handleToggleTaskCompletion={() => {
          toggleAllTaskCompletion(task.id);
        }}
        className={task.isAllCompleted ? "checked" : ""}
      />
      <ContentEditable
        className={`contentEditable-title ${task.isAllCompleted ? 'checked' : ''}`}
        html={taskTitleRef.current}
        disabled={task.isAllCompleted ? true : false || disabled}
        onChange={(event) => {
          taskTitleRef.current = event.target.value;
          if(event.target.value !== '<br>' && event.target.value !== "<div><br></div>" && event.target.value.length > 0) {
            changeTitleName(event.target.value, task.id)
          } else {
            changeTitleName(prevTaskTitleRef.current, task.id) // mobile doesn't work without this
          }
          
          if(event.target.value === '<br>' || event.target.value === '<div><br></div>' || event.target.value.length === 0) {
            toast.warn('Você precisa adicionar um título à suas tarefas!')
          }
        }}
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
