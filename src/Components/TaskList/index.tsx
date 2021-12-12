/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef } from "react";
import { Container } from "./styles";

/* import dotsImg from "../../assets/dots.svg"; */
import trashImg from '../../assets/trash.svg'
/* import editImg from "../../assets/edit.svg"; */

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

export function TaskList({ task}: TasksProps) {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);  
  const {
    isTaskModalOpen,
    isTaskEditModalOpen,
    isDeleteTaskModalOpen,
    updateCurrentTaskEditId,
    updateCurrentDeleteTaskId,
    openTaskEditModal,
    toggleDeleteTaskModal
  } = useModal();

  const firstThreeTasks = task.body.slice(0, 3);

  const handleOpenTaskModal = (event: any) => {
    updateCurrentTaskEditId(task.id);
    openTaskEditModal();
  }
  const handleToggleDeleteTaskModal = (event: any) => {
    event.stopPropagation();
    updateCurrentDeleteTaskId(task.id);
    toggleDeleteTaskModal();
  }
  return (
    <>
      {isDeleteTaskModalOpen && <DeleteTaskModal />}
      <Container
        ref={ref}
        onClick={handleOpenTaskModal}
      >
        <div className="delete">
          <button type="button" onClick={handleToggleDeleteTaskModal}>
            <img src={trashImg} alt="Excluir tarefas" />
          </button>
        </div>
        {!isTaskEditModalOpen && !isTaskModalOpen &&  
          <TaskTitle 
            task={task}
            disabled={true}
          />
        }

        {isTaskEditModalOpen &&   
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
            {!isTaskModalOpen && !isTaskEditModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={task.body[id]} />}
            {isTaskEditModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={task.body[id]} />}
            {isTaskModalOpen && <Task isCharLimited={true} disabled={true} taskBlockId={task.id} task={task.body[id]} /> }
          </div>
        ))}
      </Container>
    </>
  );
}
