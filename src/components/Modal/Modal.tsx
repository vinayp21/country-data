import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Modal.scss';

type ModalProps = {
  handleModal: () => void;
  showModal: boolean;
  children: React.ReactNode;
};

export const ModalComponent = (props: ModalProps) => {
  const { handleModal, showModal, children } = props;

  const handleClose = useCallback(() => handleModal(), [handleModal]);

  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Country Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
