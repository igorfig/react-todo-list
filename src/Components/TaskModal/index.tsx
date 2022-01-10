import Modal from "react-modal";
import { useModal } from "../../hooks/useModal";
import { Task } from "../../types";
import { Todo } from "../TaskEditable";
import { TaskTitle } from "../TaskTitleEditable";

interface TaskModalProps {
  task: Task
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
         <Todo
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
