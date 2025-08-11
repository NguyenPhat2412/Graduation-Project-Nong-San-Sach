import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ViewOrder.css";
import { Link } from "react-router-dom";

const ViewOrder = () => {
  const { orderId } = useParams();

  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`,
          {
            credentials: "include",
          }
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

  // updated data
  const handleUpdateStatus = async (status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setViewOrder((prev) => ({ ...prev, status }));
      } else {
        console.error("Error updating order status:", data);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return <p className="text-center">Đang tải dữ liệu đơn hàng...</p>;
  }

  if (!viewOrder) {
    return <p className="text-center text-red">Không tìm thấy đơn hàng.</p>;
  }

  return (
    <div className="view-order-container">
      <h1 className="view-order-title">Thông tin đơn hàng</h1>
      <div className="view-order-info">
        <p>
          <span>ID người dùng:</span> {viewOrder.userId || "N/A"}
        </p>
        <p>
          <span>Họ và tên:</span> {viewOrder.customer?.name}
        </p>
        <p>
          <span>Số điện thoại:</span> {viewOrder.customer?.phone}
        </p>
        <p>
          <span>Địa chỉ:</span> {viewOrder.customer?.address}
        </p>
        <p>
          <span>Tổng tiền:</span> {viewOrder?.totalAmount} VND
        </p>
        <p>
          <span>Trạng thái:</span>
          <select
            value={viewOrder?.status}
            onChange={(e) => handleUpdateStatus(e.target.value)}
          >
            <option value="pending">Đang chờ</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </p>
      </div>

      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
        Danh sách sản phẩm
      </h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Id sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {viewOrder.products && viewOrder.products.length > 0 ? (
            viewOrder.products.map((item) => (
              <tr key={item?._id}>
                <td>{item?.productId}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${item?.img}`}
                    alt={item?.name}
                    className="product-image-view-order"
                  />
                </td>
                <td>{item?.name}</td>
                <td>{item?.price} VND</td>
                <td>{item?.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="back-button">
        <Link to="/" style={{ marginTop: "20px" }}>
          Quay lại danh sách đơn hàng
        </Link>
      </div>
    </div>
  );
};

export default ViewOrder;
