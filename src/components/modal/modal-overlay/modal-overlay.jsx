import style from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
    return (
        <div className={style.modal} onClick={onClose}>
        </div>
    );
}

export default ModalOverlay;