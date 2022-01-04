import { Container } from "./styles";
import logoImg from "../../assets/logo.svg";
import searchImg from "../../assets/search.svg";
import pendingImg from '../../assets/pending.svg';
import doneImg from '../../assets/done.svg'

interface HeaderProps {
  isPendingTasksSelected: boolean;
  toggleTasksStatus: (boolean: boolean) => void;
}

export function Header({isPendingTasksSelected, toggleTasksStatus} : HeaderProps) {
/*   const pendingTasks = tasks.filter(task => !task.isAllCompleted)
  const doneTasks = tasks.filter(task => task.isAllCompleted)
 */
  return (
    <Container>
      <div>
        <img src={logoImg} alt="Get It Done!" />
        <h1>Get It Done!</h1>
      </div>
      
      <div>
        <div className="input-container">
          <img src={searchImg} alt="Lupa Imagem" />
          <input type="text" placeholder="Procurar por tarefas" />
        </div>
      </div>

      <div>
        <button onClick={() => toggleTasksStatus(true)}  type="button" className={isPendingTasksSelected ? 'active' : ''}>
          <img src={pendingImg} alt="Pendentes" />
        </button>
        <button
          onClick={() => toggleTasksStatus(false)} 
          type="button" 
          className={!isPendingTasksSelected ? 'active' : ''}>
          <img src={doneImg} alt="Concluídas" />
        </button>
      </div>
    </Container>
  );
}
