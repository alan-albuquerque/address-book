import Button from '@src/components/core/Button';
import React, { FunctionComponent, ReactNode } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import ReactModal from 'react-modal';
import './index.scss';

export interface ModalProps extends ReactModal.Props {
  title?: ReactNode;
  onClose?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  title,
  children,
  onRequestClose,
  ...rest
}) => {
  return (
    <ReactModal
      className="app-modal"
      overlayClassName="app-modal__overlay"
      onRequestClose={onRequestClose}
      {...rest}
    >
      <div className="app-modal__header">
        <div className="app-modal__title">{title}</div>
        <div className="app-modal__close-btn">
          <Button
            icon={<FaTimesCircle />}
            onClick={onRequestClose}
            aria-label="Close modal"
            title="Close modal"
          />
        </div>
      </div>
      <div className="app-modal__content">{children}</div>
    </ReactModal>
  );
};

export default Modal;
