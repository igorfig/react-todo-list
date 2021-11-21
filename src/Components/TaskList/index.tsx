/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useTask } from "../../hooks/useTask";
import { Container } from "./styles";

import dotsImg from "../../assets/dots.svg";
import trashImg from "../../assets/trash.svg";
import editImg from "../../assets/edit.svg";

import { useModal } from "../../hooks/useModal";
import { Task } from "../Task";
import { TaskModal } from "../TaskModal";
import { DeleteTaskModal } from "../DeleteTaskModal";
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
  const [isTaskActionsActive, setIsTaskActionsActive] = useState(false)
  const [taskState, setTaskState] = useState(task);
  useEffect(() => setTaskState(task) ,[task])

  const {
    isTaskModalOpen,
    currentTaskId,
    handleSetCurrentTaskId,
    handleToggleTaskModal,
    handleToggleDeleteTaskModal,
    handleSetCurrentDeleteTaskId,
    currentDeleteTaskId,
  } = useModal();
  const { tasks, handleToggleAllTaskCompletion } =
    useTask();

  const firstThreeTasks = taskState.body.filter((task) => task.id <= 2);
  return (
    <>
      <DeleteTaskModal tasks={tasks[currentDeleteTaskId]} />
      {isTaskModalOpen && (
        <TaskModal tasks={tasks[currentTaskId]} id={currentTaskId} />
      )}
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
                    handleSetCurrentDeleteTaskId(id);
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
                className={`checkbox-box ${
                  task.isAllCompleted ? "checked" : ""
                }`}
              ></div>
            </div>
            <span
              className={`row title-row ${
                task.isAllCompleted ? "checked" : ""
              }`}
            >
              <h2>{task.title}</h2>
            </span>
          </div>
          {firstThreeTasks.map((currentTask) => (
            <div key={currentTask.id}>
              {!isTaskModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={currentTask} />}
              {isTaskModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={currentTask} /> }
            </div>
          ))}
        </Container>
    </>
  );
}
