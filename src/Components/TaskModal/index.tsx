import Modal from "react-modal";
import { useModal } from "../../hooks/useModal";
import { useTask } from "../../hooks/useTask";
import { Task } from "../Task";
import { Checkbox } from "../UI/Checkbox";
interface TaskModalProps {
  tasks: {
    id: number;
    title: string;
    body: {
      id: number;
      task: string;
      isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
  };
  id: number;
}

Modal.setAppElement("#root");

export function TaskModal({ tasks, id  }: TaskModalProps) {
  const { isTaskModalOpen, handleToggleTaskModal } = useModal();
  const { handleToggleAllTaskCompletion } = useTask();

  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isTaskModalOpen}
      onRequestClose={handleToggleTaskModal}
    >
      <div className="editor-container">
        <div className="title">
          <Checkbox 
            handleToggleTaskCompletion={() => handleToggleAllTaskCompletion(id)}
            className={tasks.isAllCompleted ? 'checked' : ''}
          />
          <span
            className={`row title-row ${
              tasks.isAllCompleted ? "checked" : ""
            }`}
          >
            <h2>{tasks.title}</h2>
          </span>
        </div>
        {tasks.body.map(task => (
           <div key={task.id}>
              <Task
                isCharLimited={false}
                disabled={false}
                task={task}
              />
          </div>
        ))}
      </div>
    </Modal>
  );
}
