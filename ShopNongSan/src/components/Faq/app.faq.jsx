import { Container } from "react-bootstrap";
import AppFooter from "../Footer/app.footer";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import NavBar from "../NavBar/app.navbar";
import "./app.faq.css";
import { useTranslation } from "react-i18next";
const AppFaq = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <Container>
          <NavBar />
        </Container>
      </div>
      <Container className="app-faq-container">
        <div className="faq-introduction">
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Avatar_Phat/avatar.jpg`}
            alt="Tác giả"
            className="faq-image"
          />
          <div>
            <p>{t("about_intro")}</p>
          </div>
        </div>
        <div className="faq-content">
          <h2>{t("faq")}</h2>
          <ul>
            <li>
              <strong>Q: {t("faq_q1")}</strong>
              <p>A: {t("faq_a1")}</p>
            </li>
            <li>
              <strong>Q: {t("faq_q2")}</strong>
              <p>A: {t("faq_a2")}</p>
            </li>
            <li>
              <strong>Q: {t("faq_q3")}</strong>
              <p>A: {t("faq_a3")}</p>
            </li>
          </ul>
        </div>
        <div></div>
      </Container>
      <div className="register-information-section">
        <Container>
          <RegisterInformation />
        </Container>
      </div>
      <AppFooter />
    </div>
  );
};

export default AppFaq;
