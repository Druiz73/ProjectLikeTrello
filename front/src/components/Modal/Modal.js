import React from "react";
import { Modal, Button } from "react-bootstrap";
const ModalContent = ({ show, handleClose, title, successMsg, isConfirmModal, onCancel, onConfirm, btnConfirmText, btnCancelText }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMsg}</Modal.Body>
        { isConfirmModal &&
          <Modal.Footer>
            <Button onClick={onCancel} variant="secondary">{btnCancelText}</Button>
            <Button onClick={onConfirm} variant="primary">{btnConfirmText}</Button>
          </Modal.Footer>
        }
      </Modal>
    </>
  );
};

export default ModalContent;
