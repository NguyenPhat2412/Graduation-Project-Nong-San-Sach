import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./app.modal.css";
const ModalRegister = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Subscribe to Our Newsletter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton className="modal-body">
        <div>
          <img src="../../../public/Modal/BG (1).png" />
        </div>
        <div className="modal-content-1">
          <div className="modal-title-1">Subscribe to Our Newsletter</div>
          <p className="modal-title-2">
            Subscribe to our newsletter and Save your{" "}
            <strong style={{ color: "#c2af07ff" }}>20% money</strong> with
            discount code today.
          </p>
          <div className="input-form-2">
            <input type="email" placeholder="Enter your email" />
            <Button className="subscribe-button">Subscribe</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;
