import { Container } from "./styles";
interface TasksProps {
    onModalOpener: () => void;
}

export function Tasks({ onModalOpener }: TasksProps) {
    return (
        <Container onClick={onModalOpener}>
            <div className="title"> 
                <div></div>
                <h2>Boas vindas às tarefas</h2>
            </div>

           <div>
                 <div></div>
                <span>Tarefa #01</span>
            </div>

            <div>
                 <div></div>
                <span>Tarefa #02</span>
            </div>

            <div>
                 <div></div>
                <span>Tarefa #03</span>
            </div>
        </Container>
    )
}