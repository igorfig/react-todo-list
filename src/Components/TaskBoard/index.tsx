import { useModal } from "../../hooks/useModal";
import { useTask } from "../../hooks/useTask";
import { TaskList } from "../TaskList";
import { TaskModal } from "../TaskModal";
import { Container } from "./styles";

export function TaskBoard() {
  const { tasks } = useTask();
  const { isTaskModalOpen, currentTaskId } = useModal();
  const currentTask = tasks.filter(task => task.id === currentTaskId);
  return (
    <>
      {isTaskModalOpen && <TaskModal task={currentTask[0]} />}
      <Container>
        {tasks.map((task) => (
          <TaskList task={task} key={task.id} />
        ))}
        <button className="newTask">Adicionar tarefas</button>
      </Container>
    </>
  );
}
