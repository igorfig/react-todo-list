import { useTask } from "../../hooks/useTask";
import { TaskList } from "../TaskList";
import{ Container  } from './styles';

export function TaskBoard() {
    const { tasks } = useTask()
    
    return (
       <Container>
            {tasks.map(task => <TaskList task={task} id={task.id} key={task.id}/>) }
           <button className="newTask">
               Adicionar tarefas
            </button>
       </Container>
    )
}