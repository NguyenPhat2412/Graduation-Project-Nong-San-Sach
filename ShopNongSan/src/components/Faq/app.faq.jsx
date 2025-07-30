import { Container } from "react-bootstrap";
import AppFooter from "../Footer/app.footer";
import RegisterInformation from "../Home/RegisterInformation/app.register.information";
import NavBar from "../NavBar/app.navbar";
import "./app.faq.css";
const AppFaq = () => {
  return (
    <div>
      <div>
        <Container>
          <NavBar />
        </Container>
      </div>
      <Container className="app-faq-container">
        <div className="faq-introduction">
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Avatar_Phat/avatar.jpg`}
            alt="Tác giả"
            className="faq-image"
          />
          <div>
            <p>
              Tôi tên là Nguyễn Xuân Phát, sinh năm 2005, là một người đam mê
              lập trình. Là người đã tạo ra Nông sản Sạch, một trang web thương
              mại điện tử chuyên cung cấp các sản phẩm nông sản sạch và an toàn.
            </p>
          </div>
        </div>
        <div className="faq-content">
          <h2>(FAQ)</h2>
          <ul>
            <li>
              <strong>Q: Làm thế nào để đặt hàng?</strong>
              <p>
                A: Bạn có thể thêm sản phẩm vào giỏ hàng và tiến hành thanh
                toán.
              </p>
            </li>
            <li>
              <strong>Q: Chính sách đổi trả hàng hóa như thế nào?</strong>
              <p>
                A: Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày nếu sản phẩm còn
                nguyên vẹn.
              </p>
            </li>
            <li>
              <strong>Q: Tôi có thể thanh toán bằng phương thức nào?</strong>
              <p>
                A: Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản
                ngân hàng và tiền mặt khi nhận hàng.
              </p>
            </li>
          </ul>
        </div>
        <div></div>
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

export default AppFaq;
