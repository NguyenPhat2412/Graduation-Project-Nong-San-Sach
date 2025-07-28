import { Container } from "react-bootstrap";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import AppFooter from "../Footer/app.footer";
import NavBar from "../NavBar/app.navbar";
import "./app.contact.css";
const ContactMe = () => {
  return (
    <>
      <Container>
        <NavBar />
      </Container>

      <div>
        <img src="../../../public/Image/Login/Breadcrumbs (1).png" alt="Logo" />
      </div>
      <Container>
        <div>
          <h1>Contact Us</h1>
          <p>
            If you have any questions or need assistance, feel free to reach out
            to us.
          </p>
          <p>Solve your problems with our support team.</p>
        </div>
        <div className="contact-form">
          <div className="contact-details">
            <div>
              <i class="fa-solid fa-location-dot"></i>
              <p>Cao Tho, Cao Duc, Bac Ninh</p>
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
            <input placeholder="Your Name"></input>
            <input placeholder="Your Email"></input>
            <input placeholder="Subject"></input>
            <textarea placeholder="Your message here..."></textarea>
            <button>Send Message</button>
          </div>
        </div>
      </Container>
      <div className="address-image">
        <img src="/public/Address/Address.png" />
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
