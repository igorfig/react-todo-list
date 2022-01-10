import { Container } from "./styles";
import logoImg from "../../assets/logo.svg";
import searchImg from "../../assets/search.svg";
import pendingImg from "../../assets/pending.svg";
import doneImg from "../../assets/done.svg";
import deleteAllTextImg from '../../assets/close.svg'
import { useSearch } from "../../hooks/useSearch";
import { useTask } from "../../hooks/useTask";

interface HeaderProps {
  isPendingTasksSelected: boolean;
  toggleTasksStatus: (status: boolean) => void;
  inputRef: {
    current: HTMLInputElement;
  };
}

export function Header({
  isPendingTasksSelected,
  toggleTasksStatus,
  inputRef,
}: HeaderProps) {
  const { tasks } = useTask();
  const {value, handleChangeSearchValue, isSearching, handleSwitchIsSearchingStatus} = useSearch();
  const handleRemoveAllValue = () => {
    handleChangeSearchValue('');
    inputRef.current.value = '';
  }
  return (
    <Container>
      <div>
        <img src={logoImg} alt="Get It Done!" />
        <h1>Get It Done!</h1>
      </div>

      <div>
        <div className="input-container">
          <img src={searchImg} alt="Lupa Imagem" />
          <input
            disabled={tasks.length > 0 ? false : true}
            ref={inputRef}
            tabIndex={1}
            onBlur={(e) => {
              e.target.value.length === 0 && handleSwitchIsSearchingStatus(false)
            }}
            onFocus={() =>
              value.length > 0 && handleSwitchIsSearchingStatus(true)
            }
            onChange={(e) => handleChangeSearchValue(e.target.value)}
            type="text"
            placeholder="Procurar por tarefas"
          />
          {isSearching && value.length > 0 &&  <button onClick={handleRemoveAllValue}>
            <img src={deleteAllTextImg} alt="" />
          </button>}
        </div>
      </div>

      {!isSearching && value.length === 0 && (
        <div>
          <button
            onClick={() => toggleTasksStatus(true)}
            type="button"
            className={isPendingTasksSelected ? "active" : ""}
          >
            <img src={pendingImg} alt="Pendentes" />
          </button>
          <button
            onClick={() => toggleTasksStatus(false)}
            type="button"
            className={!isPendingTasksSelected ? "active" : ""}
          >
            <img src={doneImg} alt="Concluídas" />
          </button>
        </div>
      )}
    </Container>
  );
}
