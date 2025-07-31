import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const NavBarTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
        <p>Địa chỉ: Cao Thọ, Cao Đức, Bắc Ninh</p>
      </div>
      <div className="navbar-setting">
        <NavDropdown title="Tiếng Việt">
          <NavDropdown.Item href="#action/3.1">Tiếng Anh</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Tiếng Trung</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Lựa chọn khác</NavDropdown.Item>
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
              Chào mừng <strong>{userInfo}</strong>
            </div>
          </div>
        ) : (
          <div className="navbar-auth">
            <Link to={"/account/login"} className="nav-link">
              Đăng nhập
            </Link>
            <div>/</div>
            <Link to={"/account/register"} className="nav-link">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarTop;
