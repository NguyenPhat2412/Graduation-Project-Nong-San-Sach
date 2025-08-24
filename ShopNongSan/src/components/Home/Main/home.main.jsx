import { Container } from "react-bootstrap";
import { Link } from "react-router";
import "./home.main.css";
import HomeComment from "./home.comment";
import { useTranslation } from "react-i18next";
const HomeMain = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="home-main">
        <div className="home-main-board">
          <div>
            <i className="fa-solid fa-apple-whole"></i>
            <Link to="/user/order-history" className="nav-link">
              {t("fruit")}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-carrot"></i>
            <Link to="/user/coupon" className="nav-link">
              {t("vegetable")}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-fish"></i>
            <Link to="/user/favorites" className="nav-link">
              {t("fish")}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-bacon"></i>
            <Link to="/user/cart" className="nav-link">
              {t("meat")}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-wine-bottle"></i>
            <Link to="/user/setting" className="nav-link">
              {t("setting")}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-ice-cream"></i>
            <Link to="/user/farmer" className="nav-link">
              {t("icecream")}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-plus"></i>
            <Link to="/app/shop" className="nav-link">
              {t("addToCart")}
            </Link>
          </div>
        </div>
        <div>
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Banner/Rectangle 52.png`}
            alt="Image Banner"
          />
        </div>
        <div className="home-main-content">
          <p>{t("home_main_content")}</p>
          <div className="home-main-content-text">
            <p>{t("home_main_content_text")}</p>
          </div>
          <div className="home-main-content-button">
            <button>{t("buyNow")}</button>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <div className="home-main-content-support">
        <div>
          <div>
            <i className="fa-solid fa-car-side"></i>
            <p>{t("shipping_title")}</p>
          </div>
          <p>{t("shipping_desc")}</p>
        </div>

        <div>
          <div>
            <i className="fa-solid fa-headset"></i>
            <p>{t("support_title")}</p>
          </div>
          <p>{t("support_desc")}</p>
        </div>

        <div>
          <div>
            <i className="fa-solid fa-file-invoice"></i>
            <p>{t("return_title")}</p>
          </div>
          <p>{t("return_desc")}</p>
        </div>

        <div>
          <div>
            <i className="fa-solid fa-credit-card"></i>
            <p>{t("payment_title")}</p>
          </div>
          <p>{t("payment_desc")}</p>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
