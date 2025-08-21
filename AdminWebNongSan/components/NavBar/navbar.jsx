import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  return (
    <div className="nav navbar w-64 h-screen p-6 flex flex-col">
      <div>
        <div className="dashboard logo text-4xl font-bold text-gray-500 mb-6 flex items-center p-10 ">
          <h1>Quản trị viên</h1>
        </div>
      </div>
      <div className="space-y-6 navbar-list">
        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Trang chính</p>
          <Link to="/" className="main-list block py-2 px-3 rounded flex ">
            <i className="icon fa-solid fa-house"></i>
            <p>Trang chủ</p>
          </Link>
        </div>

        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Danh sách</p>
          <Link to="/users" className="main-list block py-2 px-3 rounded flex ">
            <i className="fa-regular fa-user"></i>
            <p>Người dùng</p>
          </Link>
          <Link
            to="/admin-panel"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-brands fa-rocketchat"></i>
            <p>Trò chuyện quản trị</p>
          </Link>
        </div>

        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Mới</p>
          <Link
            to="/new_blog"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-blog"></i>
            <p>Tạo Blog</p>
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
            <p>Tạo sản phẩm</p>
          </Link>
          <Link
            to="/products"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-box"></i>
            <p>Sản phẩm</p>
          </Link>
        </div>

        <div className="dashboard-list">
          <p className="text-xs text-gray-400 uppercase mb-2">Quản trị</p>
          <Link
            to="/register"
            className="main-list block py-2 px-3 rounded flex "
          >
            <i className="fa-solid fa-right-from-bracket"></i> <p>Đăng xuất</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
