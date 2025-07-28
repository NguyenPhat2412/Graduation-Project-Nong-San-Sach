import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  return (
    <div className="nav navbar w-64 h-screen p-6 flex flex-col">
      <div>
        <div className="dashboard logo text-4xl font-bold text-gray-500 mb-6 flex items-center p-10 ">
          <h1>Admin Page</h1>
        </div>
      </div>
      <div className="space-y-6 navbar-list">
        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Main</p>
          <Link to="/" className="main-list block py-2 px-3 rounded flex ">
            <i className="icon fa-solid fa-house"></i>
            <p>Dashboard</p>
          </Link>
        </div>

        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Lists</p>
          <Link to="/users" className="main-list block py-2 px-3 rounded flex ">
            <i className="fa-regular fa-user"></i>
            <p>Users</p>
          </Link>
          <Link
            to="/admin-panel"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-brands fa-rocketchat"></i>
            <p>Admin Chat</p>
          </Link>
        </div>

        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">New</p>
          <Link
            to="/new_blog"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-blog"></i>
            <p>New Blog</p>
          </Link>
          <Link to="/blogs" className="main-list block py-2 px-3 rounded flex ">
            <i className="fa-solid fa-square-rss"></i>
            <p>Blog</p>
          </Link>
          <Link
            to="/new_product"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-hotel"></i>
            <p>New Product</p>
          </Link>
          <Link
            to="/products"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-box"></i>
            <p>Products</p>
          </Link>
        </div>

        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Admin</p>
          <Link
            to="/register"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-right-from-bracket"></i> <p>Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
