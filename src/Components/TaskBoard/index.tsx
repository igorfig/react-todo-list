import { useModal } from "../../hooks/useModal";
import { useTask } from "../../hooks/useTask";
import { TaskList } from "../TaskList";
import { TaskModal } from "../TaskModal";
import { Container } from "./styles";

import mainImg from "../../assets/homeIlustration.svg";

export function TaskBoard() {
  const { tasks, createNewTaskBlock } = useTask();
  const { isTaskModalOpen, openTaskModal, isTaskEditModalOpen, currentTaskEditId } = useModal();
  const currentTask = tasks.filter((task) => task.id === currentTaskEditId);

  const handleOpenModal = () => {
    createNewTaskBlock();
    openTaskModal();
  }

  return (
    <>
      {isTaskEditModalOpen && <TaskModal task={currentTask[0]} />}
      {isTaskModalOpen && <TaskModal task={tasks[tasks.length - 1]}/>}
      <Container>
        {tasks.map((task) => tasks.length > 0 && <TaskList task={task} key={task.id} />)}
        {tasks.length === 0 && (
          <div className="without-tasks-message">
            <span>Ainda não há nada por aqui!</span>
            <span>Tente adicionar algumas tarefas</span>
            <img src={mainImg} alt="Ainda não há nenhuma tarefa" />
          </div>
        )}
        <button onClick={handleOpenModal} className="newTask">Adicionar tarefas</button>
      </Container>
    </>
  );
}
