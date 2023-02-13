import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useEffect } from 'react';

function Modal({ onClose, children }) {
    const closeOnEsc= (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    }

    useEffect(() => {
      document.body.addEventListener('keydown', closeOnEsc)
      return function cleanUp() {
        document.body.removeEventListener('keydown', closeOnEsc)
      }
    });

    return (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={style.modal}>
          <button className={style.btn} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </>
    );
}

export default Modal;