import { useEffect, useState } from "react";
import NavBar from "../NavBar/navbar";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

const DashBoard = () => {
  const [numberClient, setNumberClient] = useState(0);
  const [numberOrder, setNumberOrder] = useState(0);
  const [numberEarning, setNumberEarning] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const ProductPerPage = 4;

  const API_URL = import.meta.env.VITE_API_URL;

  const TOKEN = localStorage.getItem("token");

  if (!TOKEN) {
    navigate("/login");
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    api[type]({
      description: message,
      placement: "topRight",
      message: "Thông báo",
    });
  };
  // Lấy thông tin tổng quan
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [clientRes, orderRes, earningRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/api/admin/number-of-clients`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${API_URL}/api/admin/number-of-orders`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${API_URL}/api/admin/number-of-earnings`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${API_URL}/api/admin/orders`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        const [clientData, orderData, earningData, ordersData] =
          await Promise.all([
            clientRes.json(),
            orderRes.json(),
            earningRes.json(),
            ordersRes.json(),
          ]);

        setNumberClient(clientData.numberClient);

        setNumberOrder(orderData.numberOrder);

        setNumberEarning(earningData.totalEarnings);

        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Xử lý xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (response.ok) {
          setOrders(orders.filter((order) => order._id !== orderId));
          openNotification("success", "Xóa đơn hàng thành công!");
        } else {
          console.error("Error deleting order:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  // Phân trang
  const indexOfLastOrder = currentPage * ProductPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ProductPerPage;
  const currentOrder = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ProductPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateRange = 1;
  const startPage = Math.max(1, currentPage - Math.floor(paginateRange / 2));
  const endPage = Math.min(totalPages, startPage + paginateRange - 1);
  return (
    <div className="dashboard-container-main min-h-screen flex bg-white ">
      {contextHolder}
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div
        className="col-span-1 md:col-span-4 p-6 dashboard-container"
        style={{ width: "100%" }}
      >
        <div
          className="transactions bg-white shadow-md rounded-lg p-7 shadow-md mt-6"
          style={{ width: "100%", height: "75vh" }}
        >
          <div className="dashboard-header mb-6">
            <h1 className="text-2xl font-bold">Trang chủ</h1>

            <div className="dashboard-stats grid grid-cols-3 gap-20 mt-4 ">
              <div className="stat-item bg-gray-100 p-4 rounded shadow">
                <div>
                  <p className="text-2xl font-bold">{numberClient}</p>
                  <h2 className="text-xl font-semibold">Khách hàng</h2>
                </div>
                <div>
                  <i className="fa-solid fa-user-plus"></i>
                </div>
              </div>
              <div className="stat-item bg-gray-100 p-4 rounded shadow">
                <div>
                  <p className="text-2xl font-bold">{numberEarning} VND</p>
                  <h2 className="text-xl font-semibold">Doanh thu tháng</h2>
                </div>
                <div>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
              </div>
              <div className="stat-item bg-gray-100 p-4 rounded shadow">
                <div>
                  <p className="text-2xl font-bold">{numberOrder}</p>

                  <h2 className="text-xl font-semibold">Đơn hàng mới</h2>
                </div>
                <div>
                  <i className="fa-solid fa-file-circle-plus"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            {loading ? (
              <p>Loading</p>
            ) : orders.length === 0 ? (
              <div>Không có đơn hàng</div>
            ) : (
              <div>
                {currentOrder.map((order) => (
                  <div key={order._id} className="order-item ">
                    <table className="table-content w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="font-bold">ID User</th>
                          <th className="font-bold">Họ và tên</th>
                          <th className="font-bold">Số điện thoại</th>
                          <th className="font-bold">Địa chỉ</th>
                          <th className="font-bold">Tổng tiền</th>
                          <th className="font-bold">Giao hàng</th>
                          <th className="font-bold">Trạng thái</th>
                          <th className="font-bold">Chi tiết</th>
                          <th className="font-bold">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50 text-center">
                          <td>{order?.userId}</td>
                          <td>{order?.customer?.name}</td>
                          <td>{order?.customer?.phone}</td>
                          <td>{order?.customer?.address}</td>
                          <td>{order?.totalAmount} VND</td>
                          <td>
                            {order?.delivery
                              ? "Đã hoàn thành"
                              : "Chưa hoàn thành"}
                          </td>
                          <td>{order?.status}</td>
                          <td>
                            <Link
                              to={`/orders/${order?._id}`}
                              className="text-blue-500 hover:underline border border-blue-500"
                              style={{
                                padding: "5px 10px",
                                borderRadius: "5px",
                                backgroundColor: "#f0f0f0",
                              }}
                            >
                              Xem chi tiết
                            </Link>
                          </td>
                          <td>
                            <button
                              className="text-red-500 hover:underline border border-red-500"
                              style={{
                                padding: "5px 10px",
                                borderRadius: "5px",
                                backgroundColor: "#f0f0f0",
                              }}
                              onClick={() => handleDeleteOrder(order._id)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="dashboard-page flex justify-center mt-4 space-x-2">
                      <button
                        onClick={() => paginate(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded border ${
                          currentPage === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-500"
                        }`}
                      >
                        <i className="fa-solid fa-square-caret-left w-10 "></i>
                      </button>
                      {Array.from(
                        { length: endPage - startPage + 1 },
                        (_, i) => {
                          const pageNumber = startPage + i;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`px-3 py-1 rounded border w-10 ${
                                currentPage === pageNumber
                                  ? "bg-blue-500 text-white"
                                  : "bg-white text-blue-500"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                      )}
                      <button
                        onClick={() =>
                          paginate(Math.min(currentPage + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded border w-10 ${
                          currentPage === totalPages
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-500"
                        }`}
                      >
                        <i className="fa-solid fa-square-caret-right"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
