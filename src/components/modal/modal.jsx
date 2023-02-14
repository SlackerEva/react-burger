import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal({ onClose, children }) {
    const closeOnEsc= (e) => {
      if ((e.charCode || e.keyCode) === +process.env.REACT_APP_ESC_KEYCODE) {
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
      createPortal(
        <>
          <ModalOverlay onClose={onClose} />
          <div className={style.modal}>
            <button className={style.btn} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
        </>, modalRoot
      )
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default Modal;