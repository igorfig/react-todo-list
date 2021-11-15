/* eslint-disable jsx-a11y/anchor-is-valid */
import Modal from 'react-modal';
import { useModal } from '../../hooks/useModal';

import trashImg from '../../assets/trash.svg'

export function DeleteTaskModal() {
    const { isDeleteTaskModalOpen, handleToggleDeleteTaskModal } = useModal();

    function handleDelete() {
        // CRUD delete

        handleToggleDeleteTaskModal();
    }

    return (
        <Modal
            overlayClassName="react-modal-overlay"
            className={`delete-modal-content ${isDeleteTaskModalOpen ? 'active' : ''}` }
            isOpen={isDeleteTaskModalOpen}
            onRequestClose={handleToggleDeleteTaskModal}
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
                    onClick={handleToggleDeleteTaskModal}
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