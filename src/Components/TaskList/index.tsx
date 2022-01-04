/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef } from "react";
import FadeIn from "react-fade-in";
import { Container } from "./styles";

import moreImg from "../../assets/more.svg";

import { useModal } from "../../hooks/useModal";
import { Task } from "../TaskEditable";
import { TaskTitle } from "../TaskTitleEditable";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { useTask } from "../../hooks/useTask";
import Holdable from "../Holdable/Holdable";
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
    isHide: boolean;
  };
  isBarOpen: boolean;
  toggleBar: () => void;
  isAllSelected: boolean
}

export function TaskList({ task, toggleBar, isBarOpen, isAllSelected }: TasksProps) {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
  const {
    isTaskModalOpen,
    isTaskEditModalOpen,
    isDeleteTaskModalOpen,
    updateCurrentTaskEditId,
    updateTasksSelected,
    openTaskEditModal,
    unselectTask
  } = useModal();

  const { handleToggleTasks } = useTask();

  useEffect(() => {
    isAllSelected ? ref.current.classList.add('isSelected') : ref.current.classList.remove('isSelected');
  }, [isAllSelected])

  const handleOpenTaskModal = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    updateCurrentTaskEditId(task.id);
    openTaskEditModal();
  };

  const onHold = () => {
    ref.current.classList.add("isSelected");
    toggleBar();
    updateTasksSelected(task.id);
  };

  const handleSelectTask = () => {
    if(ref.current.classList.contains('isSelected')) {
      ref.current.classList.remove('isSelected');
      unselectTask(task.id)
    } else {
      ref.current.classList.add('isSelected') 
      updateTasksSelected(task.id)
    }
  }

  useEffect(() => {
    if (!isBarOpen) {
      ref.current.classList.remove("isSelected");
    }
  }, [isBarOpen]);

  return (
    <>
      {isDeleteTaskModalOpen && <DeleteTaskModal />}
      <FadeIn>
        <Holdable
        onClick={isBarOpen ? handleSelectTask : () => {}}
        onHold={!isBarOpen ? onHold : () => {}}
        id={task.id}
        key={task.id}>
        <Container
          ref={ref}
          onClick={!isBarOpen ? handleOpenTaskModal : () => {} } // modal on mobile only opens with this line
        >
          {!isTaskEditModalOpen && !isTaskModalOpen && (
            <TaskTitle isCharLimited={true} task={task} disabled={true} />
          )}
          {isTaskEditModalOpen && (
            <TaskTitle isCharLimited={true} task={task} disabled={true} />
          )}
          {isTaskModalOpen && (
            <TaskTitle isCharLimited={true} task={task} disabled={true} />
          )}
          <div className="actions">
            {/* <button type="button" onClick={handleToggleDeleteTaskModal}>
            <img src={trashImg} alt="Excluir" />
          </button> */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleToggleTasks(task.id);
              }}
            >
              <img
                className={`show-more ${!task.isHide ? "active" : ""}`}
                src={moreImg}
                alt="Mostrar mais"
              />
            </button>
          </div>
          {!task.isHide &&
            task.body.map((_, id) => (
              <div key={id}>
                {!isTaskModalOpen && !isTaskEditModalOpen && (
                  <Task
                    isCharLimited={true}
                    disabled={true}
                    taskBlockId={task.id}
                    task={task.body[id]}
                  />
                )}
                {isTaskEditModalOpen && (
                  <Task
                    isCharLimited={true}
                    disabled={true}
                    taskBlockId={task.id}
                    task={task.body[id]}
                  />
                )}
                {isTaskModalOpen && (
                  <Task
                    isCharLimited={true}
                    disabled={true}
                    taskBlockId={task.id}
                    task={task.body[id]}
                  />
                )}
              </div>
            ))}
        </Container>
        </Holdable>
      </FadeIn>
    </>
  );
}
