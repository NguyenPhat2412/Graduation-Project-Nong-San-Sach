import { Drawer } from "antd";
import { useEffect } from "react";
import { useUser } from "../../../UseContext/UserContext";
import "./shop.card.css";
import { Link } from "react-router";
import {
  deleteCart,
  fetchCart,
} from "../../Home/Redux/redux.controllerDatabase";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const Cart = (props) => {
  const { onClose, open } = props;
  const cart = useSelector((state) => state.cart.listCart);
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const userId = userInfo?._id;

  // Fetch cart data from API
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);

  // Handle delete item from cart
  const handleDeleteItem = async (productId) => {
    await dispatch(deleteCart({ userId, productId }));
    await dispatch(fetchCart(userId));
  };

  const { t } = useTranslation();

  return (
    <div>
      <Drawer
        title={t("cart")}
        width={600}
        placement="right"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        {cart.length > 0 ? (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item._id} className="cart-item-container">
                  <div className="cart-item">
                    <img
                      src={`${import.meta.env.VITE_DATABASE_URL}${item?.img}`}
                      alt={item?.name}
                      style={{ width: "75px", height: "75px" }}
                    />
                    <div>
                      <div className="cart-item-name">{item?.name}</div>
                      <span>{item?.price.toFixed(2)} VND </span>
                      <span>Số lượng: {item?.quantity}</span>
                    </div>
                  </div>
                  <div className="underline-cart-item"></div>
                  <div className="cart-item-delete">
                    <button onClick={() => handleDeleteItem(item?.productId)}>
                      ✗
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <div className="cart-total-label">
                <span>Tổng tiền: </span>
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  VND
                </span>
              </div>
              <button className="cart-checkout-button">Thanh toán</button>
            </div>
            <div className="cart-go-to-cart">
              <Link to="/app/shop/cart" className="nav-link">
                Đi đến giỏ hàng
              </Link>
            </div>
          </>
        ) : (
          <p>Giỏ hàng của bạn đang trống</p>
        )}
      </Drawer>
    </div>
  );
};

export default Cart;
