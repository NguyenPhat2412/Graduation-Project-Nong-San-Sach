import { Container } from "react-bootstrap";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import "./app.contact.css";
import { useState } from "react";
import { notification } from "antd";
const ContactMe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessages] = useState("");
  const [error, setError] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message: "Thông báo",
      description: message,
    });
  };

  // Validate
  const validateForm = () => {
    if (!name || !email || !subject || !message) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/api/client/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
          credentials: "include",
        }
      );
      if (response.ok) {
        openNotification("success", "Tin nhắn của bạn đã được gửi thành công!");
        setName("");
        setEmail("");
        setSubject("");
        setMessages("");
      } else {
        openNotification("error", "Đã xảy ra lỗi khi gửi tin nhắn.");
      }
    }
  };
  return (
    <>
      {contextHolder}
      <Container>
        <NavBar />
      </Container>

      <div>
        <img
          src={`${import.meta.env.VITE_DATABASE_URL}/public/Image/Login/Breadcrumbs (1).png`}
          alt="Logo"
        />
      </div>
      <Container>
        <div>
          <h1>Liên hệ với chúng tôi</h1>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, hãy thoải mái liên hệ
            với chúng tôi.
          </p>
          <p>Giải quyết vấn đề của bạn với đội ngũ hỗ trợ của chúng tôi.</p>
        </div>
        <div className="contact-form">
          <div className="contact-details">
            <div>
              <i class="fa-solid fa-location-dot"></i>
              <p>Cao Thọ, Cao Đức, Bắc Ninh</p>
            </div>
            <div>
              <i class="fa-solid fa-envelope"></i>
              <p>masterrio2412@gmail.com</p>
            </div>
            <div>
              <i class="fa-solid fa-phone-volume"></i>
              <p>+84 983549821</p>
            </div>
          </div>
          <div className="contact-form-fields">
            {error && <p className="error-message">{error}</p>}
            <input
              placeholder="Tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Chủ đề của bạn"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            ></input>
            <textarea
              placeholder="Nội dung tin nhắn của bạn..."
              value={message}
              onChange={(e) => setMessages(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Gửi tin nhắn</button>
          </div>
        </div>
      </Container>
      <div className="address-image">
        <img
          src={`${import.meta.env.VITE_DATABASE_URL}/public/Address/Address.png`}
        />
      </div>
      <div className="register-information-section">
        <Container>
          <RegisterInformation />
        </Container>
      </div>
      <AppFooter />
    </>
  );
};
export default ContactMe;
