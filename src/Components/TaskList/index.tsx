/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Container } from "./styles";

import dotsImg from "../../assets/dots.svg";
import trashImg from "../../assets/trash.svg";
import editImg from "../../assets/edit.svg";

import { useModal } from "../../hooks/useModal";
import { Task } from "../TaskEditable";
import { TaskTitle } from "../TaskTitleEditable";
import { DeleteTaskModal } from "../DeleteTaskModal";
interface TasksProps {
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
}

export function TaskList({ task }: TasksProps) {
  const [isTaskActionsActive, setIsTaskActionsActive] = useState(false)
  const {
    isTaskModalOpen,
    isDeleteTaskModalOpen,
    updateCurrentTaskId,
    updateCurrentDeleteTaskId,
    toggleTaskModal,
    toggleDeleteTaskModal,
  } = useModal();
  const firstThreeTasks = task.body.slice(0, 3);
  return (
    <>
      {isDeleteTaskModalOpen && <DeleteTaskModal />}
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
                  updateCurrentTaskId(task.id);
                  toggleTaskModal();
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
                  updateCurrentDeleteTaskId(task.id);
                  toggleDeleteTaskModal();
                  setIsTaskActionsActive((prevState) => !prevState);
                }}
              >
                <img src={trashImg} alt="Remover tarefa" />
                Deletar
              </a>
            </li>
          </ul>
        </div>
        {!isTaskModalOpen &&   
          <TaskTitle 
            task={task}
            disabled={true}
          />
        }

        {isTaskModalOpen &&   
          <TaskTitle 
            task={task}
            disabled={true}
          />
        }
        {firstThreeTasks.map((_, id) => (
          <div key={id}>
            {!isTaskModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={task.body[id]} />}
            {isTaskModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={task.body[id]} /> }
          </div>
        ))}
      </Container>
    </>
  );
}
