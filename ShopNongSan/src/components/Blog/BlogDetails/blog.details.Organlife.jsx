import { useEffect, useState } from "react";
import "./blog.details.Organlife.css";
const Organlife = () => {
  const [data, setData] = useState(null);
  // fetch data blog
  useEffect(() => {
    document.title = "Các loại rau tốt nhất cho sức khỏe của bạn!";
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/blogs/6887a20865890c736a50c9ee`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlogDetails();
  }, []);

  return (
    <main>
      <div className="blog-details">
        <div className="blog-banner">
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}${data?.banner}`}
            alt={data?.title}
          />
        </div>

        {/* TITLE */}
        <div className="blog-content">
          <p>
            <strong>
              Nếu bạn thực sự muốn một chế độ thật 'chất' thì đây là những loại
              rau nổi bật trong số rất nhiều chủng loại rau khác nhau.
            </strong>
          </p>

          <p>
            Khoai lang được coi là siêu thực phẩm rất tốt cho sức khỏe. (Nguồn:
            Facebook) Trên thị trường hiện có rất nhiều loại rau khác nhau, bạn
            hoàn toàn có thể dễ dàng mua được.
          </p>

          <p>
            Tất cả đều có những lợi ích sức khỏe riêng, một số loại tỏ ra ưu thế
            hơn những loại khác. “Ăn rau” luôn là điều mà cha mẹ chúng ta đã cố
            gắng truyền cho chúng ta kể từ khi còn nhỏ.
          </p>

          <h2>Các loại rau tốt nhất nên bao gồm trong chế độ ăn</h2>
          <ul>
            <li>
              <strong>Khoai lang:</strong> Đây là một loại rau củ giàu tinh bột.
              Khoai lang được coi là siêu thực phẩm chủ yếu vì chúng chứa nhiều
              vitamin A, vitamin C, carotenoid, chất chống oxy hóa, chất xơ…
            </li>
            <li>
              <strong>Nấm:</strong> Nấm là lựa chọn tuyệt vời cho những người ăn
              chay khi muốn thay thế protein. Ngoài ra, nấm cũng ít chất béo và
              cholesterol.
            </li>
            <li>
              <strong>Súp lơ:</strong> Theo các nghiên cứu, bông cải xanh hay
              súp lơ có chứa chất chống oxy hóa giúp bảo vệ tim và chống lại
              stress oxy hóa.
            </li>
            <li>
              <strong>Tỏi:</strong> Được đóng gói với các vitamin, khoáng chất,
              các hợp chất kháng khuẩn và kháng virus, tỏi được biết là giúp cải
              thiện sức khỏe tim mạch và tiêu hóa.
            </li>
            <li>
              <strong>Bơ:</strong> Được xếp vào hàng siêu thực phẩm, bơ chứa
              nhiều chất béo lành mạnh cũng như vitamin và khoáng chất.
            </li>
          </ul>

          <p className="source">Nguồn: baoquocte.vn</p>
        </div>
      </div>
    </main>
  );
};

export default Organlife;
