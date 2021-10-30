import { useContext } from "react";
import { TasksContext } from "../../providers/TaskContext";
import { Container } from "./styles";
interface TasksProps {
    onModalOpener?: () => void;
    tasks: {
        title: string;
        body: {
            task: string;
            isCompleted: boolean;
        }[];
    
        isAllCompleted: boolean;
    }
    id: number;
}

export function Tasks({ onModalOpener, tasks, id }: TasksProps) {
    const { handleToggleTaskCompletion, handleToggleAllTaskCompletion } = useContext(TasksContext)
    return (
        <Container onClick={onModalOpener}>
            <div className="title">
                <div className="checkbox" onClick={() => handleToggleAllTaskCompletion(id)}>
                    <div className={`checkbox-box ${tasks.isAllCompleted ? 'checked' : ''}`}></div>
                </div>
                    <span className={`row title-row ${tasks.isAllCompleted ? 'checked' : ''}`}>
                        <h2>{tasks.title}</h2>
                    </span>
            </div>
            {tasks.body.map((task, index) => (
                <div key={index}>
                    <div className="checkbox" onClick={() => handleToggleTaskCompletion(id, index)}>
                        <div className={`checkbox-box ${task.isCompleted ? 'checked' : ''}`}></div>
                    </div>
                    <span className={`row content-row ${ task.isCompleted ? 'checked' : ''}`}>
                        <span>{task.task}</span>
                    </span>
                </div>
                
            ))}
        </Container>
    )
}