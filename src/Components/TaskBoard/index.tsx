import { useModal } from "../../hooks/useModal";
import { useTask } from "../../hooks/useTask";
import { TaskList } from "../TaskList";
import { TaskModal } from "../TaskModal";
import { Container } from "./styles";

import mainImg from "../../assets/main_img.svg";

export function TaskBoard() {
  const { tasks } = useTask();
  const { isTaskModalOpen, currentTaskId } = useModal();
  const currentTask = tasks.filter((task) => task.id === currentTaskId);
  return (
    <>
      {isTaskModalOpen && <TaskModal task={currentTask[0]} />}
      <Container>
        {tasks.map((task) => tasks.length > 0 && <TaskList task={task} key={task.id} />)}
        {tasks.length === 0 && (
          <div className="without-tasks-message">
            <span>Ainda não há nada por aqui!</span>
            <span>Tente adicionar algumas tarefas</span>
            <img src={mainImg} alt="Ainda não há nenhuma tarefa" />
          </div>
        )}
        <button className="newTask">Adicionar tarefas</button>
      </Container>
    </>
  );
}
