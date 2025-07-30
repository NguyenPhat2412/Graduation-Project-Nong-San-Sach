import "./app.register.information.css";
import { useState } from "react";
import ModalRegister from "../../Modal/app.modal";
const RegisterInformation = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="register-form">
      <div className="w-25">
        <p className="fw-bold fs-5">Đăng ký nhận thông tin mới</p>
        <p>
          Vui lòng đăng ký để nhận thông tin về sản phẩm nông nghiệp và những
          tin tức mới nhất từ chúng tôi.
        </p>
      </div>
      <div className="input-form">
        <div className="input-group">
          <input type="email" placeholder="Email của bạn" />
          <button className="btn btn-success" onClick={() => setShow(true)}>
            Đăng ký
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
