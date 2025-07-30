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
          Đăng ký nhận thông tin mới
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton className="modal-body">
        <div>
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Modal/BG (1).png`}
          />
        </div>
        <div className="modal-content-1">
          <div className="modal-title-1">Đăng ký nhận thông tin mới</div>
          <p className="modal-title-2">
            Đăng ký nhận bản tin của chúng tôi và tiết kiệm{" "}
            <strong style={{ color: "#c2af07ff" }}>20% tiền</strong> với mã giảm
            giá hôm nay.
          </p>
          <div className="input-form-2">
            <input type="email" placeholder="Nhập email của bạn" />
            <Button className="subscribe-button">Đăng ký</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;
