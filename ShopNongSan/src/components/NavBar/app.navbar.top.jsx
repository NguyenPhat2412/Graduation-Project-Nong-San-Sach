import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useUser } from "../../UseContext/UserContext";
const NavBarTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { userInfo } = useUser();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo]);

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
              Chào mừng <strong>{userInfo?.username}</strong>
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
