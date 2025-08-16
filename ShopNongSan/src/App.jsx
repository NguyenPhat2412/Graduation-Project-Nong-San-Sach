// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import AppHome from "./components/Home/app.home";
import AppLogin from "./components/Login/app.login";
import AppRegister from "./components/Register/app.register";
import AppUser from "./components/User/app.user";
import AppShop from "./components/Shop/app.shop";
import App404 from "./components/404/app.404";
import ShopCart from "./components/Shop/Cart/shop.cart";

import CheckOut from "./components/Shop/CheckOut/shop.checkOut";
import ContactMe from "./components/Contact/app.contact";
import ViewOrder from "./components/User/Dashboard/ViewOrder/user.order.viewOrder";
import UserDashboard from "./components/User/Dashboard/user.history";
import UserHistory from "./components/User/History/user.history";
import UserSetting from "./components/User/Setting/user.setting";
import AppBlog from "./components/Blog/app.blog";
import AppFaq from "./components/Faq/app.faq";
import LiveChat from "./components/LiveChat/LiveChat";
import ChatBubble from "./components/LiveChat/ChatBubble";
import { useState } from "react";
import BlogDetails from "./components/Blog/BlogDetails/blog.details";

function App() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/account/login" element={<AppLogin />} />
          <Route path="/account/register" element={<AppRegister />} />
          <Route path="/account" element={<AppUser />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/order-history" element={<UserHistory />} />
          <Route path="/app/shop" element={<AppShop />} />
          <Route path="*" element={<App404 />} />
          <Route path="/app/shop/cart" element={<ShopCart />} />
          <Route path="/app/shop/checkout" element={<CheckOut />} />
          <Route path="/app/contact" element={<ContactMe />} />
          <Route path="/user/order-history/:orderId" element={<ViewOrder />} />
          <Route path="/user/settings" element={<UserSetting />} />
          <Route path="/" element={<AppHome />} />
          <Route path="/app/blog" element={<AppBlog />} />
          <Route path="/app/faq" element={<AppFaq />} />
          <Route path="/app/blog/:id" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
      <LiveChat isOpen={open} />
      <ChatBubble toggleChat={showDrawer} isOpen={open} />
    </>
  );
}

export default App;
