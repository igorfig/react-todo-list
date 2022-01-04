import { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import { useModal } from "../../hooks/useModal";
import { useTask } from "../../hooks/useTask";
import { TaskList } from "../TaskList";
import { TaskModal } from "../TaskModal";
import { Container } from "./styles";

import trashImg from "../../assets/trash.svg";
import closeImg from "../../assets/close.svg";
import voidImg from "../../assets/void.svg";
import mainImg from "../../assets/homeIlustration.svg";
import multiSelectImg from "../../assets/multiselect.svg";

interface TaskBoardProps {
  isPendingTasksSelected: boolean;
}

export function TaskBoard({ isPendingTasksSelected }: TaskBoardProps) {
  const { tasks, createNewTaskBlock } = useTask();
  const [isSelected, setIsSelected] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const {
    tasksSelected,
    isTaskModalOpen,
    openTaskModal,
    toggleDeleteTaskModal,
    isTaskEditModalOpen,
    currentTaskEditId,
    unselectAllTasks,
    selectAllTasks,
  } = useModal();
  const currentTask = tasks.filter((task) => task.id === currentTaskEditId);
  const pendingTasks = tasks.filter((task) => !task.isAllCompleted);
  const doneTasks = tasks.filter((task) => task.isAllCompleted);

  const handleOpenModal = (event: any) => {
    event.stopPropagation();
    createNewTaskBlock();
    openTaskModal();
  };

  const toggleBar = () => setIsSelected(true);
  const requestClose = () => {
    setIsSelected(false);
    unselectAllTasks();
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape') {
        requestClose();
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleOpenDeleteTaskModal = () => {
    toggleDeleteTaskModal();
    setIsSelected(false);
  };

  return (
    <>
      {isTaskEditModalOpen && <TaskModal task={currentTask[0]} />}
      {isTaskModalOpen && <TaskModal task={tasks[tasks.length - 1]} />}
      <Container>
        {isSelected && (
          <div className="top-bar">
            <button type="button" className="close-btn">
              <img src={closeImg} onClick={requestClose} alt="Fechar" />
            </button>
            <span>{tasksSelected.length} item selecionado</span>

            <button
              onClick={() => {
                setIsAllSelected(prevState => !prevState);
                selectAllTasks(isAllSelected)
              }}
              type="button"
              className="multi-select"
            >
              <img src={multiSelectImg} alt="Selecionar tudo" />
            </button>
          </div>
        )}
        {isPendingTasksSelected &&
          pendingTasks.map(
            (task) =>
              tasks.length > 0 && (
                <TaskList
                  isAllSelected={isAllSelected}
                  isBarOpen={isSelected}
                  toggleBar={toggleBar}
                  task={task}
                  key={task.id}
                />
              )
          )}
        {!isPendingTasksSelected &&
          doneTasks.map(
            (task) =>
              tasks.length > 0 && (
                <TaskList
                  isAllSelected={isAllSelected}
                  isBarOpen={isSelected}
                  toggleBar={toggleBar}
                  task={task}
                  key={task.id}
                />
              )
          )}

        {isPendingTasksSelected && pendingTasks.length === 0 && (
          <FadeIn>
            <div className="without-pending-tasks-message">
              <span>Não há nenhuma tarefa pendente, parabéns!</span>
              <img src={mainImg} alt="Vazio" />
            </div>
          </FadeIn>
        )}
        {!isPendingTasksSelected && doneTasks.length === 0 && (
          <FadeIn>
            <div className="without-done-tasks-message">
              <span>Você ainda não completou nenhuma tarefa!</span>
              <img src={voidImg} alt="Vazio" />
            </div>
          </FadeIn>
        )}

        {!isSelected && (
          <button onClick={handleOpenModal} className="newTask">
            Adicionar tarefas
          </button>
        )}

        {isSelected && (
          <div className="bottom-bar">
            <button onClick={handleOpenDeleteTaskModal} type="button" disabled={tasksSelected.length === 0 ? true : false}>
              <img src={trashImg} alt="Lixeira" />
              <span>Excluir</span>
            </button>
          </div>
        )}
      </Container>
    </>
  );
}
