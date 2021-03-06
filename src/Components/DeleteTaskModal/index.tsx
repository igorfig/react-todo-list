/* eslint-disable jsx-a11y/anchor-is-valid */
import Modal from 'react-modal';
import { useModal } from '../../hooks/useModal';

import trashImg from '../../assets/trash.svg'
import { useTask } from '../../hooks/useTask';

export function DeleteTaskModal() {
    const { isDeleteTaskModalOpen, toggleDeleteTaskModal, tasksSelected, unselectAllTasks } = useModal();
    const { deleteTaskBlock } = useTask();

    function handleDelete() {
        console.log(tasksSelected);
        deleteTaskBlock(tasksSelected);
        toggleDeleteTaskModal();
        unselectAllTasks();
    }

    return (
        <Modal
            overlayClassName="react-modal-overlay"
            className={`delete-modal-content ${isDeleteTaskModalOpen ? 'active' : ''}` }
            isOpen={isDeleteTaskModalOpen}
            onRequestClose={toggleDeleteTaskModal}
        >   
            <div className="trash">
                <img src={trashImg} alt="Lixeira" />
            </div>

           <div className="header">
                <h2>Excluir tarefa</h2>
                <span>Deseja mesmo excluir essa lista de tarefas?</span>
                <span>Essa ação é permanente.</span>
           </div>

            <div>
                <button
                    onClick={toggleDeleteTaskModal}
                >CANCELAR</button>
                <button 
                    className="main_action"
                    type="button"
                    onClick={handleDelete}
                >EXCLUIR TAREFA</button>
            </div>
        </Modal>
    )
} 