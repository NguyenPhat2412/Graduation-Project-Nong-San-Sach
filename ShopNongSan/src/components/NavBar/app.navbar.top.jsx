import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const NavBarTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  useEffect(() => {
    try {
      const CheckAuth = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/user`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setIsLoggedIn(true);
          setUserInfo(data.username);
          i18n.changeLanguage(localStorage.getItem("i18nextLng") || "vi");
        } else {
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      };
      CheckAuth();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-address">
        <i className="fa-solid fa-location-dot"></i>
        <p>{t("address")}</p>
      </div>
      <div className="navbar-setting">
        <NavDropdown
          title={
            i18n.language === "vi"
              ? "Tiếng Việt"
              : i18n.language === "en"
                ? "English"
                : "Ngôn ngữ khác"
          }
          onSelect={(eventKey) => changeLanguage(eventKey)}
        >
          <NavDropdown.Item eventKey="vi">Tiếng Việt</NavDropdown.Item>
          <NavDropdown.Item eventKey="en">English</NavDropdown.Item>
          <NavDropdown.Item eventKey="other">Khác</NavDropdown.Item>
        </NavDropdown>
        <div>|</div>
        <NavDropdown title="VND (đ)">
          <NavDropdown.Item href="#action/3.1">Euro (€)</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">CNY (¥)</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Lựa chọn khác</NavDropdown.Item>
        </NavDropdown>
        <div>|</div>
        {isLoggedIn ? (
          <div>
            <div>
              {t("hello")} <strong>{userInfo}</strong>
            </div>
          </div>
        ) : (
          <div className="navbar-auth">
            <Link to={"/account/login"} className="nav-link">
              {t("login")}
            </Link>
            <div>/</div>
            <Link to={"/account/register"} className="nav-link">
              {t("register")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarTop;
