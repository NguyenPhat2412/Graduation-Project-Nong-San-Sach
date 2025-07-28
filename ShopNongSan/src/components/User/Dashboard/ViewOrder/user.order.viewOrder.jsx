import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import "./user.order.viewOrder.css";

const ViewOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/order/${orderId}`,
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
          <span>ID User:</span> {viewOrder.userId?._id || "N/A"}
        </p>
        <p>
          <span>Full Name:</span> {viewOrder.customer?.name}
        </p>
        <p>
          <span>Phone:</span> {viewOrder.customer?.phone}
        </p>
        <p>
          <span>Address:</span> {viewOrder.customer?.address}
        </p>
        <p>
          <span>Tổng tiền:</span>{" "}
          {viewOrder.totalAmount?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>

      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
        Danh sách sản phẩm
      </h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Id product</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {viewOrder.products && viewOrder.products.length > 0 ? (
            viewOrder.products.map((item) => (
              <tr key={item._id}>
                <td>{item.productId}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_DATABASE_URL}${item.img}`}
                    alt={item.name}
                    className="product-image-view-order"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate("/account")}>
        Quay lại danh sách đơn hàng
      </button>
    </div>
  );
};

export default ViewOrder;
