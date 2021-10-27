import Modal from 'react-modal';
import { Container } from './styles';

Modal.setAppElement('#root')

interface TaskModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TaskModal({ isOpen, onRequestClose }: TaskModalProps) {
    return (
        <Modal
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            >
            <Container>
                <div className="title"> 
                    <div></div>
                    <h2>Boas vindas às tarefas</h2>
                </div>

                <div>
                    <div></div>
                    <span>Tarefa #01</span>
                </div>

                <div>
                    <div></div>
                    <span>Tarefa #02</span>
                </div>

                <div>
                    <div></div>
                    <span>Tarefa #03</span>
                </div>
            </Container>
            
        </Modal>
    )
}