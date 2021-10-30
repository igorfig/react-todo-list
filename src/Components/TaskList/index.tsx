import { Container } from "./styles";
import { Tasks } from "../Tasks/index";
import { TasksContext } from "../../providers/TaskContext";
import { useContext } from "react";
interface TaskListProps {
    modalOpener: () => void;
}

export function TaskList({ modalOpener }: TaskListProps) {
    const { tasks } = useContext(TasksContext)

    return (
        <Container>
            {tasks.map((task, id) => <Tasks key={id} tasks={task} id={id} onModalOpener={modalOpener}/>)}
        </Container>
    )
}