import { useEffect } from "react";
import "./blog.details.OtChuong.css";

const OtChuong = () => {
  useEffect(() => {
    document.title = "Quả ớt chuông có tác dụng gì? Ăn thế nào đúng cách";
  }, []);

  return (
    <main className="otchuong">
      <header className="otchuong-header">
        <h1>Quả ớt chuông có tác dụng gì? Ăn thế nào đúng cách</h1>
        <p>
          <strong>Ớt chuông đỏ</strong> không chỉ được sử dụng như một món ăn
          làm đẹp mà còn cung cấp nhiều dưỡng chất có lợi cho sức khỏe. Với màu
          sắc sặc sỡ như vàng, đỏ, cam… ớt chuông đem lại giá trị cả về{" "}
          <strong>ẩm thực và dinh dưỡng</strong>. Vậy ăn thế nào để mang lại
          hiệu quả tối ưu?
        </p>
      </header>

      <article className="otchuong-card">
        <h2>1. Thành phần dinh dưỡng trong ớt chuông</h2>
        <p>
          Ớt chuông giàu <strong>vitamin A</strong>, <strong>vitamin C</strong>{" "}
          cùng nhiều dưỡng chất khác. Một chén nhỏ (~149g) ớt chuông xanh cung
          cấp 551 IU vitamin A. Đặc biệt, <strong>ớt chuông đỏ</strong> chứa
          lượng vitamin A cao hơn, rất tốt cho mắt và thị lực.
        </p>
        <p>
          Ngoài ra, ớt chuông cung cấp hơn{" "}
          <strong>100% giá trị vitamin C</strong> hàng ngày, giúp chống oxy hoá,
          hỗ trợ mô và tăng miễn dịch. Hàm lượng <strong>folate</strong> trong
          ớt chuông hỗ trợ tạo hồng cầu, đặc biệt quan trọng với phụ nữ mang
          thai vì giúp ngăn ngừa dị tật bẩm sinh ở thai nhi.
        </p>
        <p>
          Ớt chuông còn giàu <strong>vitamin K</strong> – cần thiết cho quá
          trình đông máu, và <strong>kali</strong> – giúp cân bằng khoáng chất,
          hỗ trợ cơ bắp và ổn định huyết áp.
        </p>
      </article>

      <article className="otchuong-card">
        <h2>2. Ớt chuông và chất chống oxy hoá</h2>
        <p>
          Ớt chuông chứa nhiều hợp chất chống oxy hoá mạnh như{" "}
          <strong>vitamin C, carotenoids và flavonoids</strong>. Chúng có khả
          năng trung hoà gốc tự do, giúp giảm viêm và bảo vệ tế bào.
        </p>
        <p>
          Nghiên cứu cho thấy, thực phẩm giàu chất chống oxy hoá như ớt chuông
          có thể làm giảm nguy cơ mắc <strong>bệnh tim mạch, tiểu đường</strong>{" "}
          và <strong>ung thư</strong>. Đồng thời hỗ trợ làn da khoẻ mạnh, tươi
          trẻ.
        </p>
      </article>

      <article className="otchuong-card">
        <h2>3. Tác dụng giúp giảm cholesterol</h2>
        <p>
          Các hợp chất <strong>capsaicin</strong> trong ớt chuông giúp giảm
          cholesterol LDL, hỗ trợ kiểm soát{" "}
          <strong>bệnh tiểu đường, giảm đau và viêm</strong>. Một cốc ớt chuông
          có thể cung cấp khoảng 3g chất xơ, giúp tiêu hoá tốt và cân bằng mỡ
          máu.
        </p>
        <div className="otchuong-image-wrapper">
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/OtChuong/ot_chuong_max.jpg`}
            alt="Ot chuong"
            className="otchuong-image"
          />
          <p>Ớt chương có rất nhiều chất dinh dưỡng tốt cho sức khỏe</p>
        </div>
      </article>

      <article className="otchuong-card">
        <h2>4. Ớt chuông và nghiên cứu khoa học</h2>
        <p>
          Ngoài các lợi ích dinh dưỡng, nhiều nghiên cứu chỉ ra rằng việc ăn ớt
          chuông thường xuyên giúp giảm nguy cơ mắc các{" "}
          <strong>bệnh mạn tính</strong>, đồng thời cải thiện sức khoẻ da và hệ
          miễn dịch.
        </p>
        <div className="otchuong-image-wrapper">
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/OtChuong/ot_chuong_2_max.jpg`}
            alt="Ot chuong"
            className="otchuong-image"
          />
          <p>Ớt chuông giúp cơ thể đốt cháy nhiều calo hơn</p>
        </div>
      </article>

      <article className="otchuong-card">
        <h2>6. Ớt chuông giúp cơ thể đốt cháy nhiều calo hơn</h2>
        <p>
          Ớt chuông có thể được chế biến thành nhiều món ăn khác nhau như xào,
          nướng, làm salad hay nước ép. Để giữ lại tối đa dinh dưỡng, nên chế
          biến ớt chuông ở nhiệt độ thấp và không nấu quá lâu.
        </p>
        <p>
          Ngoài ra, ớt chuông có thể kết hợp với các thực phẩm khác như thịt,
          cá, trứng để tăng cường dinh dưỡng. Tuy nhiên, cần lưu ý không nên ăn
          quá nhiều ớt chuông mỗi ngày để tránh tác dụng phụ như
          <strong>đầy hơi, khó tiêu</strong> hoặc <strong>dị ứng</strong>.
        </p>
      </article>

      <div>
        <h2>Kết luận</h2>
        <p>
          Ớt chuông không chỉ là một loại rau củ nhiều màu sắc làm đẹp cho bữa
          ăn, mà còn là <strong>nguồn dưỡng chất quý giá</strong> cho sức khỏe.
          Với hàm lượng cao vitamin A, C, K, folate cùng các hợp chất chống oxy
          hoá, ớt chuông giúp{" "}
          <strong>
            tăng cường miễn dịch, bảo vệ tim mạch, cải thiện thị lực, hỗ trợ
            tiêu hoá và ổn định huyết áp.
          </strong>
        </p>
        <p>
          Để tận dụng tối đa lợi ích sức khỏe từ ớt chuông, hãy bổ sung chúng
          vào chế độ ăn uống hàng ngày của bạn. Bạn có thể ăn{" "}
          <strong>sống, xào, nướng hoặc làm nước ép</strong> để thưởng thức
          hương vị thơm ngon và dinh dưỡng của loại rau củ này.
        </p>
      </div>

      <p className="source">
        Nguồn:
        https://www.vinmec.com/vie/bai-viet/qua-ot-chuong-co-tac-dung-gi-nao-dung-cach-vi
      </p>
    </main>
  );
};

export default OtChuong;
