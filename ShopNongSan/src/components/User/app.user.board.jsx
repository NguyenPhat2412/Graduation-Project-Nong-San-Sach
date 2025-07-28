import { Container } from "react-bootstrap";
import { Link } from "react-router";
import "./app.user.board.css";
import { useEffect } from "react";
import Cookies from "js-cookie";

const AppUserBoard = () => {
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

  const handleLogout = () => {
    Cookies.remove("token");
    alert("You have logged out successfully!");
  };
  return (
    <Container className="user-board">
      <div>
        <i className="fa-brands fa-windows"></i>
        <Link to="/user/dashboard" className="nav-link">
          Dashboard
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-clock-rotate-left"></i>
        <Link to="/user/order-history" className="nav-link">
          Order History
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-ticket"></i>
        <Link to="/user/coupon" className="nav-link">
          Coupon
        </Link>
      </div>
      <div>
        <i className="fa-regular fa-heart"></i>
        <Link to="/user/favorites" className="nav-link">
          Favorites Products
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-cart-plus"></i>
        <Link to="/app/shop/cart" className="nav-link">
          Cart
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-gear"></i>
        <Link to="/user/setting" className="nav-link">
          Setting
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-right-to-bracket"></i>
        <Link to="/account/login" className="nav-link" onClick={handleLogout}>
          Log Out
        </Link>
      </div>
    </Container>
  );
};

export default AppUserBoard;
