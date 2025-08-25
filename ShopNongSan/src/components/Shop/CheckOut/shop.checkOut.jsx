import { Container } from "react-bootstrap";
import NavBar from "../../NavBar/app.navbar";
import AppFooter from "../../Footer/app.footer";
import { useState, useEffect } from "react";
import "./shop.checkOut.css";
import { useUser } from "../../../UseContext/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Home/Redux/redux.controllerDatabase";

import RegisterInformation from "../../Home/RegisterInformation/app.register.information";
import "./shop.checkOut.css";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const CheckOut = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { userInfo } = useUser();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listCart);

  const userId = userInfo?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validate() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !zipCode
    ) {
      openNotification("error", "Vui lòng nhập đầy đủ các thông tin!");
      return false;
    }
    if (!validateEmail(email)) {
      openNotification("error", "Vui lòng nhập địa chỉ email hợp lệ.");
      return false;
    }
    if (phoneNumber.length < 10) {
      openNotification("error", "Số điện thoại phải có ít nhất 10 chữ số.");
      return false;
    }
    if (zipCode.length < 5) {
      openNotification("error", "Mã bưu điện phải có ít nhất 5 chữ số.");
      return false;
    }
    return true;
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (validate()) {
      const response = fetch(
        `${import.meta.env.VITE_DATABASE_URL}/api/client/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            customer: {
              name: `${firstName} ${lastName}`,
              email: email,
              phone: phoneNumber,
              address: address,
            },
            products: cart.map((item) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              img: item.img,
            })),
            totalAmount: cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          }),
        }
      );
      response
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            openNotification("success", t("order_success"));

            dispatch(fetchCart(userId));

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setAddress("");
            setZipCode("");
          } else {
            openNotification("error", t("order_fail"));
            console.error("Error placing order:", data);
          }
        })
        .catch((error) => {
          console.error("Error placing order:", error);
          openNotification("error", t("order_error"));
        });
    }
  };

  // Load Tỉnh/Thành phố
  // useEffect(() => {
  //   fetch("https://provinces.open-api.vn/api/p/")
  //     .then((res) => res.json())
  //     .then((data) => setProvinces(data));
  // }, []);

  return (
    <>
      <Container>
        <NavBar />
      </Container>

      <div>
        <img
          src={`${import.meta.env.VITE_DATABASE_URL}/public/Image/Login/Breadcrumbs (1).png`}
          alt="Logo"
        />
      </div>
      <Container>
        <h1>{t("checkout_info")}</h1>
      </Container>
      <Container className="checkout-container">
        {contextHolder}
        <div>
          <div className="form-group-name">
            <div className="form-group">
              <label>{t("first_name")}</label>
              <input
                className="form-control"
                placeholder={t("first_name")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t("last_name")}</label>
              <input
                className="form-control"
                placeholder={t("last_name")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t("email")}</label>
              <input
                className="form-control"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group-phone">
            <div className="form-group">
              <label>{t("phone")}</label>
              <input
                className="form-control"
                placeholder={t("phone")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t("address_checkout")}</label>
              <input
                className="form-control"
                placeholder={t("address_checkout")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-zip">
            <div className="form-group">
              <label>{t("zip_code")}</label>
              <input
                className="form-control"
                placeholder="100000"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t("country")}</label>
              <input className="form-control" value="Vietnam" readOnly />
            </div>

            <div className="form-group">
              <label>{t("payment_method")}</label>
              <select className="form-control">
                <option value="">{t("select")}</option>
                <option value="cod">{t("payment_method_cod")}</option>
                <option value="card">{t("payment_method_card")}</option>
              </select>
            </div>
          </div>
          <div>
            <h2>{t("additional_info")}</h2>
            <textarea
              className="form-control"
              placeholder={t("additional_placeholder")}
              rows="4"
            ></textarea>
            <p>{t("disclaimer")}</p>
          </div>
        </div>

        <div className="register-information-section">
          <div className="order-summary-title">{t("order_summary")}</div>
          {cart.length > 0 ? (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item._id} className="cart-item-container">
                    <div className="cart-item">
                      <div className="cart-item-image">
                        <img
                          src={`${import.meta.env.VITE_DATABASE_URL}${item?.img}`}
                          alt={item?.name}
                          style={{ width: "50px", height: "50px" }}
                        />
                        <div className="cart-item-details">
                          <div className="cart-item-details-name">
                            <div>{item?.name}</div>
                            <div>x{item?.quantity}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cart-item-price">
                        {(item?.price * item?.quantity).toFixed(2)} VND
                      </div>
                    </div>
                    <div className="underline-cart-item"></div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <div>{t("total")}: </div>
                <div>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  VND
                </div>
              </div>
              <div>
                <button onClick={handleSubmit} className="nav-link-1">
                  {t("confirm_order")}
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <p>{t("empty_cart")}</p>
            </div>
          )}
        </div>
      </Container>
      <div className="register-information-section">
        <Container>
          <RegisterInformation />
        </Container>
      </div>
      <AppFooter />
    </>
  );
};

export default CheckOut;
