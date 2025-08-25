import { Container } from "react-bootstrap";
import NavBar from "../../NavBar/app.navbar";
import RegisterInformation from "../../Home/RegisterInformation/app.register.information";
import AppFooter from "../../Footer/app.footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../../../UseContext/UserContext";
import { useEffect } from "react";
import "./shop.cart.css";
import {
  deleteCart,
  fetchCart,
  updateCart,
} from "../../Home/Redux/redux.controllerDatabase";
import { useTranslation } from "react-i18next";
const ShopCart = () => {
  const cart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useUser();

  const { t } = useTranslation();

  const userId = userInfo?._id;

  const handleQuantityChange = (userId, productId, quantity) => {
    if (quantity < 1) return;
    if (userId)
      dispatch(updateCart({ userId, productId, quantity })).then(() => {
        dispatch(fetchCart(userId));
      });
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Get cart with userId from Database
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);

  const handleProceed = () => {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before proceeding."
      );
      return;
    }
    navigate("/app/shop/checkout");
  };

  const handleDeleteCart = async (userId, productId) => {
    await dispatch(deleteCart({ userId, productId }));
    await dispatch(fetchCart(userId));
  };

  return (
    <div>
      <div>
        <Container>
          <NavBar />
        </Container>
      </div>
      <div>
        <img
          src={`${import.meta.env.VITE_DATABASE_URL}/public/Image/Login/Breadcrumbs (1).png`}
          alt="Logo"
        ></img>
      </div>
      <Container className="cart-header">
        <h1 className="cart-title">{userInfo?.username}'s Cart</h1>
        <p className="cart-subtitle">
          Bạn có {cart.length} sản phẩm{cart.length !== 1 ? "s" : ""} trong giỏ
          hàng
        </p>
      </Container>
      <Container className="cart-container">
        <main>
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              {t("cart_empty")}. <br />
              <button
                className="cart-go-to-cart"
                onClick={() => navigate("/app/shop")}
              >
                {t("cart_go_to_shop")}
              </button>
            </div>
          ) : (
            <div>
              <div className="cart-table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>{t("cart_image")}</th>
                      <th>{t("cart_item")}</th>
                      <th>{t("cart_price")}</th>
                      <th>{t("cart_quantity")}</th>
                      <th>{t("cart_total")}</th>
                      <th>{t("cart_action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={`${import.meta.env.VITE_DATABASE_URL}${item.img}`}
                            alt={item.name}
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price.toFixed(2)} VND</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                userId,
                                item.productId,
                                Number(e.target.value)
                              )
                            }
                          />
                        </td>
                        <td>{(item.price * item.quantity).toFixed(2)} VND</td>
                        <td>
                          <button
                            onClick={() =>
                              handleDeleteCart(userId, item.productId)
                            }
                          >
                            {t("cart_delete")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate("/shop")}
                    className="px-4 py-2"
                  >
                    {t("cart_shopping")}
                  </button>
                  <button onClick={handleProceed} className="px-4 py-2">
                    {t("checkout")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        <div className="cart-summary">
          <span className="cart-total-check">{t("cart_summary")}</span>
          <div className="cart-total-details-container">
            <div className="cart-total-details">
              <span className="cart-subtotal-label">{t("cart_subtotal")}</span>
              <span className="text-gray-500">{totalPrice.toFixed(2)} VND</span>
            </div>
            <div className="cart-total-details">
              <span className="cart-shipping-label">{t("cart_shipping")}</span>
              <span className="text-gray-500">{t("cart_shipping_text")}</span>
            </div>
            <div className="cart-total-details">
              <span className="cart-total-label">
                {t("cart_total_uppercase")}
              </span>
              <span className="text-gray-500">{totalPrice.toFixed(2)} VND</span>
            </div>
          </div>
          <input placeholder={t("cart_coupon")} className="coupon-input" />
          <button className="apply-coupon-button">
            <i className="fa-solid fa-gift"></i> {t("cart_coupon")}
          </button>
        </div>
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

export default ShopCart;
