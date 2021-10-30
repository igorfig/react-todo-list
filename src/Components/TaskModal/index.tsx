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
            isOpen={false}
            onRequestClose={onRequestClose}
            >
            <Container>
                
            </Container>
            
        </Modal>
    )
}