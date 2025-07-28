import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DashBoard from "../components/Dashboard/Dashboard";
import Users from "../Pages/Users";
import SignUpPage from "../Pages/Register/RegisterPage";
import LoginPage from "../Pages/Login/LoginPage";
import AdminPanel from "../Pages/Admin";
import Product from "../Pages/Product/Product";
import ViewOrder from "../Pages/ViewOrder/ViewOrder";
import NewBlog from "../Pages/Blog/NewBlog";
import EditProduct from "../Pages/Product/EditProduct";
import NewProduct from "../Pages/Product/NewProduct";
import Blog from "../Pages/Blog/ListBlog";
import EditBlog from "../Pages/Blog/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/new_product" element={<NewProduct />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders/:orderId" element={<ViewOrder />} />
        <Route path="/new_blog" element={<NewBlog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/edit-blog/:blogId" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
