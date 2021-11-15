/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useTask } from "../../hooks/useTask";
import { Container } from "./styles";

import dotsImg from "../../assets/dots.svg";
import trashImg from "../../assets/trash.svg";
import editImg from "../../assets/edit.svg";

import { useModal } from "../../hooks/useModal";
import { Checkbox } from "../UI/Checkbox";
import { Task } from "../Task";
import { TaskModal } from "../TaskModal";
interface TasksProps {
  task: {
    id: number;
    title: string;
    body: {
      id: number;
      task: string;
      isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
  };
  id: number;
}

export function TaskList({ task, id }: TasksProps) {
  const [isTaskActionsActive, setIsTaskActionsActive] = useState(false);

  const { currentTaskId, handleSetCurrentTaskId, handleToggleTaskModal, handleToggleDeleteTaskModal } = useModal();
  const { tasks, handleToggleTaskCompletion, handleToggleAllTaskCompletion } =
    useTask();

  return (
    <>
      <TaskModal tasks={tasks[currentTaskId]} id={currentTaskId} />
      <Container>
        <div className="task-actions">
          <button
            onClick={() => setIsTaskActionsActive((prevState) => !prevState)}
            className="dots"
          >
            <img src={dotsImg} alt="Menu da tarefa" />
          </button>

          <ul className={isTaskActionsActive ? "active" : ""}>
            <li>
              <a
                href="#"
                onClick={() => {
                  handleSetCurrentTaskId(id);
                  handleToggleTaskModal();
                  setIsTaskActionsActive((prevState) => !prevState);
                }}
              >
                <img src={editImg} alt="Editar tarefas" />
                Editar
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  handleToggleDeleteTaskModal();
                  setIsTaskActionsActive((prevState) => !prevState);
                }}
              >
                <img src={trashImg} alt="Remover tarefa" />
                Deletar
              </a>
            </li>
          </ul>
        </div>

        <div className="title">
          <div
            className="checkbox"
            onClick={() => handleToggleAllTaskCompletion(id)}
          >
            <div
              className={`checkbox-box ${task.isAllCompleted ? "checked" : ""}`}
            ></div>
          </div>
          <span
            className={`row title-row ${task.isAllCompleted ? "checked" : ""}`}
          >
            <h2>{task.title}</h2>
          </span>
        </div>
        {task.body.map((task) => (
          <div key={task.id}>
            <Checkbox
              handleToggleTaskCompletion={() =>
                handleToggleTaskCompletion(id, task.id)
              }
              className={task.isCompleted ? "checked" : ""}
            />
            <Task disabled={true} task={task} />
          </div>
        ))}
      </Container>
    </>
  );
}
