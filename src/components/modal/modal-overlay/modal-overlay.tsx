import style from './modal-overlay.module.css';
import { FC } from "react";

type TModalOverlayProps = {
  onClose: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {
    return (
        <div className={style.modal} onClick={onClose}>
        </div>
    );
}

export default ModalOverlay;