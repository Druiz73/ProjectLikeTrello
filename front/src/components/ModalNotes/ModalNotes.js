import React, { useState } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import SwitchBtn from '../SwitchBtn/SwitchBtn';
import { useTranslation } from "react-i18next";


const ModalNotes = ({ show, handleClose, noteValues, handleOnChange }) => {
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="d-flex align-items-center justify-content-between">
        <Modal.Title>Shareable Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="border-bottom pb-2 mb-2">
          <Col xs={4}>
            <p className="my-0 mx-2">Copy Link<span><BsCheckCircle /></span> </p>
          </Col>
          <Col xs={8} className="d-flex align-items-center justify-content-end">
            <SwitchBtn checked={checked} setChecked={setChecked} />
          </Col>
        </Row>
        <Container>
          <Row>
            <Col>
              <form>
                <div className="form-group">
                  <label htmlFor="title">{t("ModalTitleLabel")}</label>
                  <input
                    value={noteValues.title} 
                    type="text" 
                    className="form-control" 
                    id="title"
                    name="title"
                    onChange={e => handleOnChange({ ...noteValues, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">{t("ModalContentLabel")}</label>
                  <textarea
                    value={noteValues.description} 
                    className="form-control" 
                    id="content"
                    name="description" 
                    rows="5"
                    onChange={e => handleOnChange({ ...noteValues, [e.target.name]: e.target.value })} 
                  />
                </div>
                <div className="form-group d-flex justify-content-end">
                  <Button onClick={handleClose} className="mx-2" variant="secondary">{t("ModalCancelButton")}</Button>
                  <Button variant="primary">{t("ModalSaveButton")}</Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
 
export default ModalNotes;