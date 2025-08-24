import { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";
import Cart from "../Shop/Card/shop.card";
import { useUser } from "../../UseContext/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../Home/Redux/redux.controllerDatabase";
import ListProductSearch from "./app.navbar.listProductSearch";
import { useTranslation } from "react-i18next";

const NavBarBetween = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart.listCart);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  useEffect(() => {
    const response = fetch(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to fetch products");
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [search]);

  // Search
  useEffect(() => {
    if (search) {
      const filteredProduct = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterProducts(filteredProduct);
    }
  }, [search]);

  const userId = userInfo?._id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="navbar-between">
      <div className="navbar-between-content">
        <div className="navbar-logo">
          <img src="/Image/Logo/Group.png" alt="" />
          <p>Nông Sản Sạch</p>
        </div>
        <div className="navbar-search">
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>{t("search")}</Button>
          </div>
          <div className="list-product-search">
            <ListProductSearch products={filterProducts} search={search} />
          </div>
        </div>
        <div className="navbar-icons">
          <i className="fa-solid fa-bell"></i>
          <div>|</div>
          <div className="cart-icon" onClick={showDrawer}>
            <i className="fa-solid fa-bag-shopping">
              {" "}
              <span className="cart-length-navbar">{cart.length}</span>
            </i>
          </div>
          <span>
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
            VND
          </span>

          <div>|</div>
          <Link to={"/account"} className="nav-link">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
      <div className="navbar-between-menu">
        <div className="navbar-menu">
          <NavDropdown title={t("home")}>
            <NavDropdown.Item as={Link} to="/">
              {t("home")}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/app/about">
              {t("about")}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="#action/3.3">
              {t("other")}
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={t("shop")}>
            <NavDropdown.Item as={Link} to="/app/shop">
              {t("productList")}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/app/shop/cart">
              {t("cart")}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/app/shop/checkout">
              {t("checkout")}
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={t("blog")}>
            <NavDropdown.Item as={Link} to="/app/blog">
              {t("blog")}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              {t("newsInfo")}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">{t("other")}</NavDropdown.Item>
          </NavDropdown>
          <Link to="/app/faq" className="nav-link">
            {t("about")}
          </Link>
          <Link to="/app/contact" className="nav-link">
            {t("contact")}
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
