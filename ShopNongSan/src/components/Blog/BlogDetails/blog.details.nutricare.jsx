import React, { useEffect } from "react";
import "./blog.details.nutricare.css";

const Nutricare = () => {
  useEffect(() => {
    document.title = "Top rau củ tăng sức đề kháng hiệu quả và an toàn";
  }, []);

  return (
    <main className="nc">
      <header className="nc-hero">
        <h1>Top 6+ rau củ giúp tăng sức đề kháng hiệu quả & an toàn</h1>
        <p className="nc-sub">
          Rau củ giàu vitamin A, C, E; khoáng chất; chất xơ cùng các chất chống
          oxy hoá giúp bổ sung dinh dưỡng cho cơ thể. Dưới đây là gợi ý những
          lựa chọn phổ biến, cách dùng và mẹo chế biến ngắn gọn.
        </p>
      </header>

      {/* ===== MỤC LỤC ===== */}
      <nav className="nc-toc" aria-label="Mục lục">
        <strong>Mục lục</strong>
        <ol>
          <li>
            <a href="#spinach">1. Rau bina (Cải bó xôi)</a>
          </li>
          <li>
            <a href="#broccoli">2. Bông cải xanh</a>
          </li>
          <li>
            <a href="#cabbage">3. Cải bắp</a>
          </li>
          <li>
            <a href="#pumpkin">4. Bí đỏ</a>
          </li>
          <li>
            <a href="#sweetpotato">5. Khoai lang</a>
          </li>
          <li>
            <a href="#carrot">6. Cà rốt</a>
          </li>
        </ol>
      </nav>

      {/* ===== 1. RAU BINA ===== */}
      <article id="spinach" className="nc-card">
        <h2>1. Rau bina (Cải bó xôi) — khẩu phần tham chiếu 100g</h2>

        <div className="nc-grid">
          <section>
            <h3>Thành phần dinh dưỡng</h3>
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Protein</td>
                  <td>2.91 g</td>
                </tr>
                <tr>
                  <td>Lipid</td>
                  <td>0.60 g</td>
                </tr>
                <tr>
                  <td>Beta-caroten</td>
                  <td>3,670 µg</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>30.3 mg</td>
                </tr>
                <tr>
                  <td>Vitamin B1</td>
                  <td>…</td>
                </tr>
                <tr>
                  <td>Vitamin E</td>
                  <td>…</td>
                </tr>
                <tr>
                  <td>Canxi</td>
                  <td>67 mg</td>
                </tr>
                <tr>
                  <td>Sắt</td>
                  <td>1.05 mg</td>
                </tr>
                <tr>
                  <td>Magie</td>
                  <td>93 mg</td>
                </tr>
                <tr>
                  <td>Phốt pho</td>
                  <td>41 mg</td>
                </tr>
              </tbody>
            </table>
          </section>

          <div className="nc-image-wrapper">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/nutricare/rau-bina-ho-tro-tang-cuong-de-khang.jpg`}
              alt="Rau bina (Cải bó xôi)"
              className="nc-image"
            />
          </div>

          <section className="nc-notes">
            <h3>Lợi ích & mẹo chế biến</h3>
            <ul>
              <li>
                Beta-caroten (tiền chất vitamin A) giúp chống oxy hoá, hỗ trợ
                miễn dịch.
              </li>
              <li>
                Vitamin C hỗ trợ tăng cường đề kháng và khả năng chống nhiễm
                trùng.
              </li>
              <li>Flavonoid có thể giúp giảm nguy cơ cảm lạnh.</li>
            </ul>
            <p>
              <strong>Cách chế biến:</strong> Nấu nhanh (xào nhanh/hấp/luộc) để
              giữ dưỡng chất và giải phóng vitamin A khỏi axit oxalic. Thử canh
              bó xôi nấu tôm/thịt, trộn salad, sinh tố hoặc nước ép.
            </p>
          </section>
        </div>
      </article>

      {/* ===== 2. BÔNG CẢI XANH ===== */}
      <article id="broccoli" className="nc-card">
        <h2>2. Bông cải xanh — 100g</h2>
        <div className="nc-grid">
          <section>
            <h3>Thành phần dinh dưỡng</h3>
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Protein</td>
                  <td>3 g</td>
                </tr>
                <tr>
                  <td>Lipid</td>
                  <td>0.3 g</td>
                </tr>
                <tr>
                  <td>Beta-caroten</td>
                  <td>93 µg</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>88 mg</td>
                </tr>
                <tr>
                  <td>Vitamin B1</td>
                  <td>0.08 mg</td>
                </tr>
                <tr>
                  <td>Vitamin E</td>
                  <td>0.04 mg</td>
                </tr>
                <tr>
                  <td>Canxi</td>
                  <td>33 mg</td>
                </tr>
                <tr>
                  <td>Sắt</td>
                  <td>0.73 mg</td>
                </tr>
                <tr>
                  <td>Magie</td>
                  <td>20 mg</td>
                </tr>
                <tr>
                  <td>Phốt pho</td>
                  <td>62 mg</td>
                </tr>
                <tr>
                  <td>Kali</td>
                  <td>300 mg</td>
                </tr>
                <tr>
                  <td>Natri</td>
                  <td>23 mg</td>
                </tr>
                <tr>
                  <td>Kẽm</td>
                  <td>0.64 mg</td>
                </tr>
              </tbody>
            </table>
          </section>

          <div className="nc-image-wrapper">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/nutricare/bong-cai-xanh.jpg`}
              alt="Bông cải xanh"
              className="nc-image"
            />
          </div>
          <section className="nc-notes">
            <h3>Lợi ích & mẹo chế biến</h3>
            <ul>
              <li>Vitamin A, C, E hỗ trợ sức khỏe miễn dịch.</li>
              <li>
                Sulforaphane: hợp chất chống oxy hoá, có thể giúp bảo vệ niêm
                mạc hô hấp.
              </li>
            </ul>
            <p>
              <strong>Cách chế biến:</strong> Hấp hoặc xào rất nhanh để giữ vi
              chất; có thể ăn sống nếu rửa sạch kỹ.
            </p>
          </section>
        </div>
      </article>

      {/* ===== 3. CẢI BẮP ===== */}
      <article id="cabbage" className="nc-card">
        <h2>3. Cải bắp — 100g</h2>
        <div className="nc-grid">
          <section>
            <h3>Thành phần dinh dưỡng</h3>
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Protein</td>
                  <td>1.8 g</td>
                </tr>
                <tr>
                  <td>Lipid</td>
                  <td>0.1 g</td>
                </tr>
                <tr>
                  <td>Beta-caroten</td>
                  <td>65 µg</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>30 mg</td>
                </tr>
                <tr>
                  <td>Vitamin B1</td>
                  <td>0.15 mg</td>
                </tr>
                <tr>
                  <td>Vitamin E</td>
                  <td>0.15 mg</td>
                </tr>
                <tr>
                  <td>Canxi</td>
                  <td>48 mg</td>
                </tr>
                <tr>
                  <td>Sắt</td>
                  <td>1.1 mg</td>
                </tr>
                <tr>
                  <td>Magie</td>
                  <td>13 mg</td>
                </tr>
                <tr>
                  <td>Phốt pho</td>
                  <td>31 mg</td>
                </tr>
                <tr>
                  <td>Kali</td>
                  <td>190 mg</td>
                </tr>
                <tr>
                  <td>Natri</td>
                  <td>28 mg</td>
                </tr>
                <tr>
                  <td>Kẽm</td>
                  <td>0.81 mg</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="nc-notes">
            <h3>Lợi ích & mẹo chế biến</h3>
            <ul>
              <li>Polyphenol chống oxy hoá, hỗ trợ miễn dịch.</li>
              <li>Giàu vitamin C giúp tăng đề kháng.</li>
            </ul>
            <p>
              <strong>Liều lượng tham khảo:</strong> 200–300 g/bữa. <br />
              <strong>Cách chế biến:</strong> Luộc, xào nhanh, salad; có thể ép
              nước bắp cải.
            </p>
          </section>
        </div>
      </article>

      {/* ===== 4. BÍ ĐỎ ===== */}
      <article id="pumpkin" className="nc-card">
        <h2>4. Bí đỏ — 100g</h2>
        <div className="nc-grid">
          <section>
            <h3>Thành phần dinh dưỡng</h3>
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Protein</td>
                  <td>0.3 g</td>
                </tr>
                <tr>
                  <td>Lipid</td>
                  <td>0.1 g</td>
                </tr>
                <tr>
                  <td>Beta-caroten</td>
                  <td>3,100 µg</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>8 mg</td>
                </tr>
                <tr>
                  <td>Vitamin B1</td>
                  <td>0.06 mg</td>
                </tr>
                <tr>
                  <td>Vitamin E</td>
                  <td>1.06 mg</td>
                </tr>
                <tr>
                  <td>Canxi</td>
                  <td>24 mg</td>
                </tr>
                <tr>
                  <td>Sắt</td>
                  <td>0.5 mg</td>
                </tr>
                <tr>
                  <td>Magie</td>
                  <td>10 mg</td>
                </tr>
                <tr>
                  <td>Phốt pho</td>
                  <td>16 mg</td>
                </tr>
                <tr>
                  <td>Kali</td>
                  <td>349 mg</td>
                </tr>
                <tr>
                  <td>Natri</td>
                  <td>8 mg</td>
                </tr>
                <tr>
                  <td>Kẽm</td>
                  <td>0.1 mg</td>
                </tr>
                <tr>
                  <td>Folate</td>
                  <td>16 µg</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="nc-image-wrapper">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/nutricare/bi-do-ho-tro-tang-cuong-de-khang.jpg`}
              alt="Bí đỏ"
              className="nc-image"
            />
          </div>
          <section className="nc-notes">
            <h3>Lợi ích & mẹo chế biến</h3>
            <ul>
              <li>
                Giàu beta-caroten (tiền vitamin A) hỗ trợ miễn dịch, da & niêm
                mạc.
              </li>
              <li>Vitamin C hỗ trợ sản xuất bạch cầu.</li>
              <li>Bổ sung thêm vitamin E, sắt, folate…</li>
            </ul>
            <p>
              <strong>Liều lượng tham khảo:</strong> Không quá ~2 lần/tuần để
              tránh tích luỹ tiền vitamin A.
              <br />
              <strong>Cách chế biến:</strong> Cháo bí đỏ, sữa bí đỏ, bí đỏ nhồi
              thịt, bánh bí đỏ chiên…
            </p>
          </section>
        </div>
      </article>

      {/* ===== 5. KHOAI LANG ===== */}
      <article id="sweetpotato" className="nc-card">
        <h2>5. Khoai lang — 100g</h2>
        <div className="nc-grid">
          <section>
            <h3>Thành phần dinh dưỡng</h3>
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Protein</td>
                  <td>0.8 g</td>
                </tr>
                <tr>
                  <td>Lipid</td>
                  <td>0.2 g</td>
                </tr>
                <tr>
                  <td>Beta-caroten</td>
                  <td>150 µg</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>23 mg</td>
                </tr>{" "}
                {/* sửa "23g" → "23 mg" */}
                <tr>
                  <td>Vitamin B1</td>
                  <td>0.05 mg</td>
                </tr>
                <tr>
                  <td>Vitamin E</td>
                  <td>0.26 mg</td>
                </tr>
                <tr>
                  <td>Canxi</td>
                  <td>34 mg</td>
                </tr>
                <tr>
                  <td>Sắt</td>
                  <td>1.0 mg</td>
                </tr>
                <tr>
                  <td>Magie</td>
                  <td>201 mg</td>
                </tr>
                <tr>
                  <td>Phốt pho</td>
                  <td>49 mg</td>
                </tr>
                <tr>
                  <td>Kali</td>
                  <td>210 mg</td>
                </tr>
                <tr>
                  <td>Natri</td>
                  <td>31 mg</td>
                </tr>
                <tr>
                  <td>Kẽm</td>
                  <td>0.2 mg</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="nc-image-wrapper">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/nutricare/khoai-lang-tim.jpg`}
              alt="Bí đỏ"
              className="nc-image"
            />
          </div>
          <section className="nc-notes">
            <h3>Lợi ích & mẹo chế biến</h3>
            <ul>
              <li>
                Giàu beta-caroten, vitamin C & E: chống oxy hoá, hỗ trợ miễn
                dịch.
              </li>
              <li>
                Có protein với hoạt tính tương tự glutathione và nhiều chất xơ,
                khoáng.
              </li>
            </ul>
            <p>
              <strong>Lưu ý:</strong> Không nên ăn lúc đói để tránh khó chịu dạ
              dày. Nên ăn kèm sữa chua/sữa nguyên kem/rau xanh; có thể ăn cả vỏ
              (rửa sạch).
            </p>
          </section>
        </div>
      </article>

      {/* ===== 6. CÀ RỐT ===== */}
      <article id="carrot" className="nc-card">
        <h2>6. Cà rốt — 100g</h2>
        <div className="nc-grid">
          <section>
            <h3>Thành phần dinh dưỡng</h3>
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Protein</td>
                  <td>1.5 g</td>
                </tr>
                <tr>
                  <td>Lipid</td>
                  <td>0.2 g</td>
                </tr>
                <tr>
                  <td>Beta-caroten</td>
                  <td>8,285 µg</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>8 mg</td>
                </tr>
                <tr>
                  <td>Vitamin B1</td>
                  <td>0.06 mg</td>
                </tr>
                <tr>
                  <td>Vitamin E</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Canxi</td>
                  <td>43 mg</td>
                </tr>
                <tr>
                  <td>Sắt</td>
                  <td>0.8 mg</td>
                </tr>
                <tr>
                  <td>Magie</td>
                  <td>12 mg</td>
                </tr>
                <tr>
                  <td>Phốt pho</td>
                  <td>39 mg</td>
                </tr>
                <tr>
                  <td>Kali</td>
                  <td>266 mg</td>
                </tr>
                <tr>
                  <td>Natri</td>
                  <td>52 mg</td>
                </tr>
                <tr>
                  <td>Kẽm</td>
                  <td>1.11 mg</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="nc-image-wrapper">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}/public/Blog/BlogDetails/nutricare/nuoc-ep-ca-rot.jpg`}
              alt="Khoai lang tím"
              className="nc-image"
            />
          </div>
          <section className="nc-notes">
            <h3>Lợi ích & mẹo chế biến</h3>
            <ul>
              <li>
                Beta-caroten, lutein, zeaxanthin hỗ trợ miễn dịch & sức khoẻ
                mắt.
              </li>
              <li>Vitamin B6 hỗ trợ cơ thể tạo kháng thể.</li>
            </ul>
            <p>
              <strong>Liều lượng tham khảo:</strong> Người lớn ≤ ~300 g/tuần;
              trẻ em ≤ ~150 g/tuần. <br />
              <strong>Cách chế biến:</strong> Hấp/nướng/xào nhẹ giúp hấp thu
              carotenoid tốt hơn; nước ép dùng vừa phải.
            </p>
          </section>
        </div>
      </article>

      <footer className="nc-footer">
        <p>
          <em>Lưu ý nhỏ:</em> Đã loại bỏ các hàng trùng lặp (ví dụ canxi/sắt ở
          rau bina) và sửa lỗi đơn vị rõ ràng (ví dụ vitamin C của khoai lang:
          23 <strong>mg</strong>).
        </p>
        <p className="source">
          Nguồn:
          https://nutricare.com.vn/dinh-duong/tang-cuong-mien-dich/rau-cu-giup-tang-suc-de-khang.html
        </p>
      </footer>
    </main>
  );
};

export default Nutricare;
