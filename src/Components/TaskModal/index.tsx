import Modal from "react-modal";
import { useModal } from "../../hooks/useModal";
import { Task } from "../TaskEditable";
import { TaskTitle } from "../TaskTitleEditable";
interface TaskModalProps {
  task: {
    id: string;
    title: string;
    body: {
      id: string;
      task: string;
      isCompleted: boolean;
    }[];

    isAllCompleted: boolean;
  };
}

Modal.setAppElement("#root");

export function TaskModal({ task }: TaskModalProps) {
  const { isTaskModalOpen, toggleTaskModal, currentTaskId } = useModal();
   return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isTaskModalOpen}
      onRequestClose={toggleTaskModal}
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
