import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "../components/Dashboard/Dashboard.css";
import { notification } from "antd";
// import DashBoardNavbar from "../components/Dashboard/NavBarDashBoard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 6;

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api[type]({
      message: "Notification",
      description: message,
    });
  };

  // Lấy thông tin người dùng
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  // Lấy số lượng người dùng
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Lỗi lấy số lượng người dùng:", err));
  }, []);

  // Delete user theo id
  const handleDeleteUser = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/admin/users/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      setUsers(users.filter((user) => user._id !== id));
      openNotification("success", "User deleted successfully!");
    } else {
      openNotification("error", "Failed to delete user!");
    }
  };

  // Phân trang
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentUsers = users.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(users.length / bookingsPerPage);

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

      <div className="col-span-1 md:col-span-4 p-6 dashboard-container">
        <div className="transactions bg-white shadow-md rounded-lg p-6 shadow-md mt-6">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          {users.length === 0 ? (
            <p className="text-gray-500">No User found.</p>
          ) : (
            <div className="transactions-list overflow-x-auto">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-200 text-gray-700 text-xl">
                  <tr>
                    <th className="py-4 px-6 border">STT</th>

                    <th className="py-4 px-6 border">ID</th>
                    <th className="py-4 px-6 border">User Name</th>
                    <th className="py-4 px-6 border">Password</th>
                    <th className="py-4 px-6 border">Full Name</th>
                    <th className="py-4 px-6 border">Email</th>
                    <th className="py-4 px-6 border">isAdmin</th>
                    <th className="py-4 px-6 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((b, idx) => (
                    <tr key={b._id} className="border-t">
                      <td className="py-2 px-3 border">
                        {(currentPage - 1) * bookingsPerPage + idx + 1}
                      </td>

                      <td className="py-2 px-3 border">{b._id}</td>
                      <td className="py-2 px-3 border">
                        {b.username || "N/A"}
                      </td>
                      <td className="py-2 px-3 border">{b.password}</td>
                      <td className="py-2 px-3 border">
                        {b.fullName || "N/A"}
                      </td>
                      <td className="py-2 px-3 border">{b.email}</td>
                      <td className="py-2 px-3 border">
                        {b.isAdmin ? "Yes" : "No"}
                      </td>
                      <td className="py-2 px-3 border">
                        <button
                          style={{
                            backgroundColor: "redcó",
                            color: "white",
                            padding: "10px 20px",
                          }}
                          onClick={() => handleDeleteUser(b._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
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
                })}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
