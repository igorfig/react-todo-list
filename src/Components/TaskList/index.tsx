import { Container } from "./styles";
import { Tasks } from "../Tasks/index";
import trashImg from '../../assets/trash.svg'

interface TaskListProps {
    modalOpener: () => void;
}

export function TaskList({ modalOpener }: TaskListProps) {
    return (
        <Container>
            <Tasks onModalOpener={modalOpener} />
            <Tasks onModalOpener={modalOpener} />
            <Tasks onModalOpener={modalOpener} />
            <Tasks onModalOpener={modalOpener} />
            <Tasks onModalOpener={modalOpener} />
            <Tasks onModalOpener={modalOpener} />
            <Tasks onModalOpener={modalOpener} />
        </Container>
    )
}