import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";

const DashboardNavbar = ({ userId }) => {
  const [numberUser, setNumberUser] = useState(0);
  const [numberOrders, setNumberOrders] = useState(0);
  const [numberEarnings, setNumberEarnings] = useState(0);
  const [numberBalance, setNumberBalance] = useState(0);

  // Lấy tất cả user
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/user/users`)
      .then((res) => res.json())
      .then((data) => setNumberUser(data.length))
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  // Lấy booking theo user
  useEffect(() => {
    if (!userId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/client/order/:userId`)
      .then((res) => res.json())
      .then((data) => {
        setNumberOrders(data.length);

        const total = data.reduce((acc, b) => acc + b.totalPrice, 0);
        setNumberEarnings(total);
        setNumberBalance(total); // Có thể tách nếu có logic riêng
      })
      .catch((err) => console.error("Lỗi lấy booking:", err));
  }, [userId]);

  return (
    <nav className="navbar">
      <ul className="flex justify-between p-4 rounded gap-20">
        <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 uppercase font-semibold w-70 h-30 shadow-md rounded-lg">
          Users
          <p>{numberUser}</p>
          <i className="fa-solid fa-users text-red-500 text-xl"></i>
        </li>
        <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 w-70 h-30 shadow-md rounded-lg uppercase font-semibold">
          Orders
          <p>{numberOrders}</p>
          <i className="fa-solid fa-truck text-yellow-500 text-xl"></i>
        </li>
        <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 w-70 h-30 shadow-md rounded-lg uppercase font-semibold">
          Earnings
          <p>${numberEarnings}</p>
          <i className="fa-solid fa-money-bill text-green-500 text-xl"></i>
        </li>
        <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 w-70 h-30 shadow-md rounded-lg uppercase font-semibold">
          Balance
          <p>${numberBalance}</p>
          <i className="fa-solid fa-scale-balanced text-purple-500 text-xl"></i>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNavbar;
