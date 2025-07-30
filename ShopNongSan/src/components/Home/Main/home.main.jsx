import { Container } from "react-bootstrap";
import { Link } from "react-router";
import "./home.main.css";
import HomeComment from "./home.comment";
const HomeMain = () => {
  return (
    <>
      <div className="home-main">
        <div className="home-main-board">
          <div>
            <i className="fa-solid fa-apple-whole"></i>
            <Link to="/user/order-history" className="nav-link">
              Trái cây
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-carrot"></i>
            <Link to="/user/coupon" className="nav-link">
              Rau củ
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-fish"></i>
            <Link to="/user/favorites" className="nav-link">
              Cá
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-bacon"></i>
            <Link to="/user/cart" className="nav-link">
              Thịt
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-wine-bottle"></i>
            <Link to="/user/setting" className="nav-link">
              Cài Đặt
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-ice-cream"></i>
            <Link to="/user/farmer" className="nav-link">
              Kem
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-plus"></i>
            <Link to="/app/shop" className="nav-link">
              Xem thêm sản phẩm
            </Link>
          </div>
        </div>
        <div>
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Banner/Rectangle 52.png`}
            alt="Image Banner"
          />
        </div>
        <div className="home-main-content">
          <p>Rau củ tươi mát và Hoa quả ngon</p>
          <div className="home-main-content-text">
            <p>Giảm giá lên đến 48%</p>
          </div>
          <div className="home-main-content-button">
            <button>Mua ngay</button>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <div className="home-main-content-support">
        <div>
          <div>
            <i className="fa-solid fa-car-side"></i>
            <p>Phí vận chuyển với giá tốt</p>
          </div>
          <p>Phí vận chuyển từ giá tốt bởi các đơn vị đối tác</p>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-headset"></i>
            <p>Hỗ trợ khách hàng 24/7</p>
          </div>
          <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn</p>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-file-invoice"></i>
            <p>Đổi trả hàng dễ dàng</p>
          </div>
          <p>Chúng tôi hỗ trợ đổi trả hàng trong vòng 30 ngày</p>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-credit-card"></i>
            <p>Thanh toán an toàn</p>
          </div>
          <p>Chúng tôi đảm bảo thông tin thanh toán của bạn được bảo mật</p>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
