import i18n from "i18next";
import { First } from "react-bootstrap/esm/PageItem";
import { initReactI18next } from "react-i18next";
// tạo bản dịch
const resources = {
  en: {
    translation: {
      hello: "Welcome",
      welcome: "Welcome to my website",
      address: "Address: Cao Thọ, Cao Đức, Bắc Ninh",
      home: "Home",
      shop: "Shop",
      blog: "Blog",
      cart: "Cart",
      about: "About Me",
      contact: "Contact",
      checkout: "Checkout",
      login: "Login",
      register: "Register",
      search: "Search",
      searchPlaceholder: "Search products...",
      other: "Other",
      productList: "Product List",

      email: "Your Email...",

      newsInfo: "News Info",
      fruit: "Fruit",
      vegetable: "Vegetable",
      fish: "Fish",
      meat: "Meat",
      setting: "Setting",
      icecream: "Ice Cream",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      home_main_content: "Fresh Vegetables and Delicious Fruits",
      home_main_content_text: "Discount up to 48%",

      shipping_title: "Affordable Shipping",
      shipping_desc: "Shipping at the best price from our partners",

      support_title: "24/7 Customer Support",
      support_desc: "Our support team is always ready to help you",

      return_title: "Easy Returns",
      return_desc: "We support product returns within 30 days",

      payment_title: "Secure Payment",
      payment_desc: "We ensure your payment information is safe",

      featured_products_header: "Featured Products",

      recently_viewed_header: "Recently Viewed Products",
      showLess: "Show Less",
      showMore: "Show More",

      no_recently_viewed: "No recently viewed products",
      register_info_title: "Sign up for updates",
      register_info_desc:
        "Please enter your email address to receive the latest updates.",
    },
  },
  vi: {
    translation: {
      hello: "Xin chào",
      welcome: "Chào mừng bạn đến với trang web của tôi",
      address: "Địa chỉ: Cao Thọ, Cao Đức, Bắc Ninh",
      home: "Trang chủ",
      shop: "Cửa hàng",
      blog: "Blog",
      about: "Về chúng tôi",
      contact: "Liên hệ",
      login: "Đăng nhập",
      register: "Đăng ký",
      checkout: "Thanh toán",
      cart: "Giỏ hàng",
      search: "Tìm kiếm",
      searchPlaceholder: "Tìm kiếm sản phẩm...",
      other: "Lựa chọn khác",
      productList: "Danh sách sản phẩm",
      newsInfo: "Thông tin tin tức",

      email: "Email của bạn...",

      fruit: "Trái cây",
      vegetable: "Rau củ",
      fish: "Hải sản",
      meat: "Thịt",
      setting: "Cài đặt",
      icecream: "Kem",
      addToCart: "Thêm vào giỏ hàng",
      buyNow: "Mua ngay",
      home_main_content: "Rau củ tươi mát và Hoa quả ngon",
      home_main_content_text: "Giảm giá lên đến 48%",

      shipping_title: "Phí vận chuyển với giá tốt",
      shipping_desc: "Phí vận chuyển từ giá tốt bởi các đơn vị đối tác",

      support_title: "Hỗ trợ khách hàng 24/7",
      support_desc: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn",

      return_title: "Đổi trả hàng dễ dàng",
      return_desc: "Chúng tôi hỗ trợ đổi trả hàng trong vòng 30 ngày",

      payment_title: "Thanh toán an toàn",
      payment_desc:
        "Chúng tôi đảm bảo thông tin thanh toán của bạn được bảo mật",

      featured_products_header: "Sản phẩm nổi bật",
      showLess: "Lược bớt",
      showMore: "Xem thêm",

      recently_viewed_header: "Sản phẩm đã xem gần đây",

      no_recently_viewed: "Chưa có sản phẩm nào được xem gần đây",

      register_info_title: "Đăng ký nhận thông tin mới",
      register_info_desc:
        "Vui lòng nhập địa chỉ email của bạn để nhận thông tin mới nhất nông sản sạch của chúng tôi ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
