import Modal from "react-modal";
import { useModal } from "../../hooks/useModal";
import { Task } from "../TaskEditable";
import { TaskTitle } from "../TaskTitleEditable";
interface TaskModalProps {
  task: {
    id: number;
    title: string;
    body: {
      id: number;
      task: string;
      isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
  };
}

Modal.setAppElement("#root");

export function TaskModal({ task }: TaskModalProps) {
  const { isTaskModalOpen, handleToggleTaskModal, currentTaskId } = useModal();

  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isTaskModalOpen}
      onRequestClose={handleToggleTaskModal}
    >
      <TaskTitle task={task} disabled={false} />
      {task.body.map((task) => (
        <div key={task.id}>
          <Task
            taskBlockId={currentTaskId}
            isCharLimited={false}
            disabled={false}
            task={task}
          />
        </div>
      ))}
    </Modal>
  );
}
