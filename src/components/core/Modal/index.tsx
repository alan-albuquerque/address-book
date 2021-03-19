import Button from '@src/components/core/Button';
import React, { FunctionComponent, ReactNode } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import ReactModal from 'react-modal';
import './index.scss';

export interface ModalProps extends ReactModal.Props {
  title?: ReactNode;
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
        <div className="app-modal__title" data-testid="modalTitle">
          {title}
        </div>
        <div className="app-modal__close-btn">
          <Button
            icon={<FaTimesCircle />}
            onClick={onRequestClose}
            aria-label="Close modal"
            title="Close modal"
            data-testid="closeButton"
            tabIndex={0}
          />
        </div>
      </div>
      <div className="app-modal__content" data-testid="content">
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
