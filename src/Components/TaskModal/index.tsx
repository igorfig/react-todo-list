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
  const { isTaskModalOpen, isTaskEditModalOpen, requestClose, currentTaskEditId } = useModal();
  let id: string;
  function verifyId() : string { 
    if(isTaskModalOpen) {
        id = task.id
    } else if (isTaskEditModalOpen) {
        id = currentTaskEditId
    }
    return id;
  }

  id = verifyId();


  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isTaskEditModalOpen || isTaskModalOpen}
      onRequestClose={requestClose}
    >
      <TaskTitle task={task} disabled={false} />
      {task.body.map((task) => (
        <div key={task.id}>
         <Task
            taskBlockId={id}
            isCharLimited={false}
            disabled={false}
            task={task}
          />
        </div>
      ))}
    </Modal>
  );
}
