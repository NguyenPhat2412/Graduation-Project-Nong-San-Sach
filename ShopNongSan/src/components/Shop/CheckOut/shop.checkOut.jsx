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
      message: "Notification",
      description: message,
    });
  };

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
      openNotification("error", "Please fill in all fields.");
      return false;
    }
    if (!validateEmail(email)) {
      openNotification("error", "Please enter a valid email address.");
      return false;
    }
    if (phoneNumber.length < 10) {
      openNotification(
        "error",
        "Phone number must be at least 10 digits long."
      );
      return false;
    }
    if (zipCode.length < 5) {
      openNotification("error", "Zip code must be at least 5 digits long.");
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
            handleMessage();
          } else {
            openNotification(
              "error",
              "Failed to place order. Please try again."
            );
            console.error("Error placing order:", data);
          }
        })
        .catch((error) => {
          console.error("Error placing order:", error);
          openNotification(
            "error",
            "An error occurred while placing your order."
          );
        });
    }
  };

  const handleMessage = async () => {
    openNotification("loading", "Placing order...");
    setTimeout(() => {
      openNotification("success", "Order placed successfully!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setZipCode("");
      dispatch(fetchCart(userId));
    }, 2000);
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
        <h1>Thông tin thanh toán</h1>
      </Container>
      <Container className="checkout-container">
        {contextHolder}
        <div>
          <div className="form-group-name">
            <div className="form-group">
              <label>Họ</label>
              <input
                className="form-control"
                placeholder="Họ"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tên</label>
              <input
                className="form-control"
                placeholder="Tên"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group-phone">
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                className="form-control"
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                placeholder="Đường, tòa nhà, v.v."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-zip">
            <div className="form-group">
              <label>Mã bưu chính (ZipCode)</label>
              <input
                className="form-control"
                placeholder="100000"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Quốc gia</label>
              <input className="form-control" value="Vietnam" readOnly />
            </div>

            <div className="form-group">
              <label>Phương thức thanh toán</label>
              <select className="form-control">
                <option value="">Chọn</option>
                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                <option value="card">Thẻ tín dụng/thẻ ghi nợ</option>
              </select>
            </div>

            <div className="form-group">
              <label>Số thẻ</label>
              <input
                className="form-control"
                placeholder="**** **** **** ****"
              />
            </div>
          </div>
          <div>
            <h2>Thông tin bổ sung</h2>
            <textarea
              className="form-control"
              placeholder="Bất kỳ ghi chú hoặc hướng dẫn bổ sung nào"
              rows="4"
            ></textarea>
            <p>
              Chúng tôi sẽ không bao giờ chia sẻ thông tin của bạn với bất kỳ ai
              khác.
            </p>
          </div>
        </div>

        <div className="register-information-section">
          <div className="order-summary-title">Tóm tắt đơn hàng</div>
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
                <div>Tổng: </div>
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
                  Xác nhận đơn hàng
                </button>
              </div>
            </>
          ) : (
            <p>Giỏ hàng của bạn đang trống</p>
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
