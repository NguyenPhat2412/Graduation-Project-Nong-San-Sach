import "./app.register.information.css";
import { useState } from "react";
import ModalRegister from "../../Modal/app.modal";
const RegisterInformation = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="register-form">
      <div className="w-25">
        <p className="fw-bold fs-5">Sign Up For New Information</p>
        <p>
          Please sign up to receive information about agricultural products and
          the latest news from us.
        </p>
      </div>
      <div className="input-form">
        <input type="email" placeholder="Your email" />
        <button className="btn btn-success" onClick={() => setShow(true)}>
          Sign Up
        </button>
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
