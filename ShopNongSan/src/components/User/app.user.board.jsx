import { Container } from "react-bootstrap";
import { Link } from "react-router";
import "./app.user.board.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const AppUserBoard = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchUserInfo = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/user`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
      };

      fetchUserInfo();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/logout`, {
        method: "POST",
        credentials: "include",
      });
      Cookies.remove("token", { path: "/", sameSite: "None", secure: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Container className="user-board">
      <div>
        <i className="fa-brands fa-windows"></i>
        <Link to="/user/dashboard" className="nav-link">
          {t("dashboard")}
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-clock-rotate-left"></i>
        <Link to="/user/order-history" className="nav-link">
          {t("order_history")}
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-ticket"></i>
        <Link to="/user/coupon" className="nav-link">
          {t("coupon")}
        </Link>
      </div>
      <div>
        <i className="fa-regular fa-heart"></i>
        <Link to="/user/favorites" className="nav-link">
          {t("favorite_products")}
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-cart-plus"></i>
        <Link to="/app/shop/cart" className="nav-link">
          {t("cart")}
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-gear"></i>
        <Link to="/user/settings" className="nav-link">
          {t("setting")}
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-right-to-bracket"></i>
        <Link to="/account/login" className="nav-link" onClick={handleLogout}>
          {t("logout")}
        </Link>
      </div>
    </Container>
  );
};

export default AppUserBoard;
