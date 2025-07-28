import { useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";
import Cart from "../Shop/Card/shop.card";

const NavBarBetween = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="navbar-between">
      <div className="navbar-between-content">
        <div className="navbar-logo">
          <img src="/Image/Logo/Group.png" alt="" />
          <p>Nông Sản Sạch</p>
        </div>
        <div className="navbar-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search product" />
          <Button>Search</Button>
        </div>
        <div className="navbar-icons">
          <i className="fa-solid fa-bell"></i>
          <div>|</div>
          <i className="fa-solid fa-bag-shopping" onClick={showDrawer}></i>
          <div>|</div>
          <Link to={"/account"} className="nav-link">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
      <div className="navbar-between-menu">
        <div className="navbar-menu">
          <NavDropdown title="Home">
            <NavDropdown.Item href="/">Home</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Tiếng Trung</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Lựa chọn khác
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Shop">
            <NavDropdown.Item href="/app/shop">List Vegetable</NavDropdown.Item>
            <NavDropdown.Item href="/app/shop/cart">Cart</NavDropdown.Item>
            <NavDropdown.Item href="/app/shop/checkout">
              Check Out
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Blogs">
            <NavDropdown.Item href="/app/blog">Blog</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Tiếng Trung</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Lựa chọn khác
            </NavDropdown.Item>
          </NavDropdown>
          <p>About Us</p>
          <Link to="/app/contact" className="nav-link">
            Contact
          </Link>
        </div>
        <div>
          <i className="fa-solid fa-phone-volume"></i>
          <span>+84 983549821</span>
        </div>
      </div>
      <Cart open={open} onClose={onClose} />
    </div>
  );
};

export default NavBarBetween;
