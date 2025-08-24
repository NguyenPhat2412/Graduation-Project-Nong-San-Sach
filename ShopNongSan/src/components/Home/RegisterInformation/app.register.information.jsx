import "./app.register.information.css";
import { useState } from "react";
import ModalRegister from "../../Modal/app.modal";
import { useTranslation } from "react-i18next";
const RegisterInformation = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="register-form">
      <div className="register-form-header">
        <p className="fw-bold fs-5">{t("register_info_title")}</p>
        <p>{t("register_info_desc")}</p>
      </div>
      <div className="input-form">
        <div className="input-group-register">
          <input type="email" placeholder={t("email")} />
          <button className="btn btn-success" onClick={() => setShow(true)}>
            {t("register")}
          </button>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center gap-2">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-x-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>
      </div>
      <ModalRegister show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default RegisterInformation;
