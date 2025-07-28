import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Cookies from "js-cookie";
import { Link } from "react-router";
const NavBarTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);

      const fetchUserInfo = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/user`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setUserInfo(data);
      };

      fetchUserInfo();
    }
  }, []);
  return (
    <div className="navbar">
      <div className="navbar-address">
        <i className="fa-solid fa-location-dot"></i>
        <p>Address: Cao Tho, Cao Duc, Bac Ninh</p>
      </div>
      <div className="navbar-setting">
        <NavDropdown title="Vietnamese">
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
              Welcome back! <strong>{userInfo?.username}</strong>
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
