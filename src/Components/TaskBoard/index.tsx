import { TaskList } from "../TaskList";
import{ Container  } from './styles';

import trashImg from '../../assets/trash.svg'

interface TaskBoardProps {
    modalOpener: () => void;
}

export function TaskBoard({ modalOpener }: TaskBoardProps) {
    return (
       <Container>
            <TaskList modalOpener={modalOpener} />
          {/*   <div className="btn-trash">
                <button 
                    type="button"
                    >
                    <img src={trashImg} alt="Deletar Tarefa" />
                    <span>Excluir</span>
                </button>
            </div> */}

            <button className="newTask">
               Adicionar tarefas
            </button> 
       </Container>
    )
}