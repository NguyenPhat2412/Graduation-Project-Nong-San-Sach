import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewOrder.css";

const ViewOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/client/order/view-orders/${orderId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setViewOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <p className="view-loading">Đang tải dữ liệu đơn hàng...</p>;
  }

  if (!viewOrder) {
    return <p className="view-error">Không tìm thấy đơn hàng.</p>;
  }

  return (
    <div className="view-container">
      <h1 className="view-title">Thông tin đơn hàng</h1>
      <div className="view-info">
        <p>
          <strong>ID User:</strong> {viewOrder.userId}
        </p>
        <p>
          <strong>Full Name:</strong> {viewOrder.customer.name}
        </p>
        <p>
          <strong>Phone:</strong> {viewOrder.customer.phone}
        </p>
        <p>
          <strong>Address:</strong> {viewOrder.customer.address}
        </p>
        <p>
          <strong>Tổng tiền:</strong>{" "}
          {viewOrder.totalPrice?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>

      <h3 className="view-subtitle">Danh sách sản phẩm</h3>

      <table className="view-table">
        <thead>
          <tr>
            <th>ID sản phẩm</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {viewOrder.cart && viewOrder.cart.length > 0 ? (
            viewOrder.cart.map((item) => (
              <tr key={item._id}>
                <td>{item.productId}</td>
                <td>
                  <img src={item.img} alt={item.name} className="view-image" />
                </td>
                <td>{item.name}</td>
                <td>
                  {item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="view-back-btn" onClick={() => navigate("/")}>
        Quay lại danh sách đơn hàng
      </button>
    </div>
  );
};

export default ViewOrder;
