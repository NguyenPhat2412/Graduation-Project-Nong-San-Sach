import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./app.modal.css";
import { useTranslation } from "react-i18next";
const ModalRegister = (props) => {
  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("modal_title")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton className="modal-body">
        <div>
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Modal/BG (1).png`}
          />
        </div>
        <div className="modal-content-1">
          <div className="modal-title-1">{t("modal_title")}</div>
          <p className="modal-title-2">
            {t("modal_description")}{" "}
            <strong style={{ color: "#c2af07ff" }}>{t("money")}</strong>
          </p>
          <div className="input-form-2">
            <input type="email" placeholder={t("email")} />
            <Button className="subscribe-button">{t("subscribe")}</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;
