import i18n from "i18next";
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

      checkout_info: "Checkout Information",
      first_name: "First Name",
      last_name: "Last Name",
      email_checkout: "Email",
      phone: "Phone Number",
      address_checkout: "Address",
      zipcode: "Zip Code",
      country: "Country",
      payment_method: "Payment Method",
      payment_cod: "Cash on Delivery (COD)",
      payment_card: "Credit/Debit Card",
      additional_info: "Additional Information",
      additional_placeholder: "Any notes or additional instructions",
      disclaimer: "We will never share your information with anyone else.",
      order_summary: "Order Summary",
      confirm_order: "Confirm Order",
      empty_cart: "Your cart is empty",
      total: "Total",
      notification: "Notification",
      order_success: "Order placed successfully!",
      order_fail: "Please try again.",
      order_error: "An error occurred while placing the order.",

      // update user
      userId_check: "You need login after when use service",

      // message
      message: "Notification",

      // update user
      user_title_update: "Update User Information",
      update: "Update",
      update_failed: "Failed to update user information",

      close: "Close",

      // user board
      dashboard: "Dashboard",
      order_history: "Order History",
      coupon: "Coupon",
      favorite_products: "Favorite Products",
      logout: "Logout",

      // history
      history_title: "Order History",
      history_order_id: "Order ID",
      history_date: "Date",
      history_total: "Total",
      history_status: "Status",
      history_action: "Action",
      history_empty: "No order history available",
      history_see: "View Order",

      // Cart
      cart_title: "Shopping Cart",
      cart_image: "Image",
      cart_item: "Item",
      cart_quantity: "Quantity",
      cart_delete: "Delete",
      cart_price: "Price",
      cart_total: "Total",
      cart_empty: "Your cart is empty",
      cart_checkout: "Proceed to Checkout",
      cart_go_to_shop: "Go to Shop",
      cart_shopping: "Continue Shopping",
      cart_summary: "CART TOTALS",
      cart_subtotal: "SUBTOTAL",
      cart_shipping: "SHIPPING",
      cart_total_uppercase: "TOTAL",
      cart_shipping_text: "Free Shipping",
      cart_coupon: "Coupon Code",

      // card
      quantity: "Quantity",

      // Modal:
      modal_title: "Register Information Last Newsletter",
      modal_description:
        "Please enter your email address to subscribe to our newsletter.",
      money: "discount 20% money",

      // About
      about_intro:
        "My name is Nguyễn Xuân Phát, born in 2005, a programming enthusiast. I am the creator of Nông sản Sạch, an e-commerce website specializing in providing clean and safe agricultural products.",

      faq: "FAQ",
      faq_q1: "How do I place an order?",
      faq_a1: "You can add products to your cart and proceed to checkout.",
      faq_q2: "What is the return policy?",
      faq_a2:
        "We support returns within 30 days if the product is still intact.",
      faq_q3: "What payment methods can I use?",
      faq_a3:
        "We accept payments via credit card, bank transfer, and cash on delivery.",

      // Contact
      contact_title: "Contact Us",

      contact_notification: "Your message has been sent successfully!",
      contact_notification_error:
        "An error occurred while sending the message.",
      contact_desc1:
        "If you have any questions or need support, feel free to contact us.",
      contact_desc2: "Resolve your issues with our support team.",
      contact_address: "Cao Thọ, Cao Đức, Bắc Ninh",
      contact_email: "masterrio2412@gmail.com",
      contact_phone: "+84 983549821",

      contact_name_placeholder: "Your name",
      contact_email_placeholder: "Your email",
      contact_subject_placeholder: "Your subject",
      contact_message_placeholder: "Your message...",
      contact_button: "Send Message",

      all_category: "All Categories",
      price: "Price",
      evaluate: "Evaluate",
      discount: "Discount",

      data_loading: "Loading data...",
      data_error: "Not found your order",
      data_information: "Order information",
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

      checkout_info: "Thông tin thanh toán",
      first_name: "Họ",
      last_name: "Tên",
      email_checkout: "Email",
      phone: "Số điện thoại",
      address_checkout: "Địa chỉ",
      zipcode: "Mã bưu chính (ZipCode)",
      country: "Quốc gia",
      payment_method: "Phương thức thanh toán",
      payment_cod: "Thanh toán khi nhận hàng (COD)",
      payment_card: "Thẻ tín dụng/thẻ ghi nợ",
      additional_info: "Thông tin bổ sung",
      additional_placeholder: "Bất kỳ ghi chú hoặc hướng dẫn bổ sung nào",
      disclaimer:
        "Chúng tôi sẽ không bao giờ chia sẻ thông tin của bạn với bất kỳ ai khác.",
      order_summary: "Tóm tắt đơn hàng",
      confirm_order: "Xác nhận đơn hàng",
      empty_cart: "Giỏ hàng của bạn đang trống",
      total: "Tổng",
      notification: "Thông báo",
      order_success: "Đặt hàng thành công!",
      order_fail: "Hãy thử đặt hàng lại.",
      order_error: "Đã xảy ra lỗi khi đặt hàng.",

      // update user
      userId_check: "Bạn cần đăng nhập trước khi sử dụng dịch vụ",
      user_title_update: "Cập nhật thông tin người dùng",
      update: "Cập nhật",
      update_failed: "Cập nhật không thành công",

      // message
      message: "Thông báo",
      close: "Đóng",

      // user board

      order_history: "Lịch sử đơn hàng",
      coupon: "Phiếu giảm giá",
      favorite_products: "Sản phẩm yêu thích",
      logout: "Đăng xuất",
      dashboard: "Bảng điều khiển",

      // History:
      history_title: "Lịch sử đơn hàng",
      history_order_id: "Mã đơn hàng",
      history_date: "Ngày",
      history_total: "Tổng tiền",
      history_status: "Trạng thái",
      history_action: "Hành động",
      history_empty: "Không có lịch sử đơn hàng",
      history_see: "Xem đơn hàng",

      // cart
      cart_title: "Giỏ hàng",
      cart_image: "Hình ảnh",
      cart_item: "Sản phẩm",
      cart_delete: "Xóa",
      cart_quantity: "Số lượng",
      cart_price: "Giá",
      cart_total: "Tổng",
      cart_empty: "Giỏ hàng của bạn đang trống",
      cart_checkout: "Tiến hành thanh toán",
      cart_go_to_shop: "Đi đến cửa hàng",
      cart_shopping: "Tiếp tục mua sắm",
      cart_summary: "TỔNG GIÁ TRỊ GIỎ HÀNG",
      cart_subtotal: "TẠM TÍNH",
      cart_shipping: "PHÍ VẬN CHUYỂN",
      cart_total_uppercase: "TỔNG",
      cart_shipping_text: "Miễn phí vận chuyển",
      cart_coupon: "Mã giảm giá",

      // card:
      quantity: "Số lượng",

      // modal:
      modal_title: "Đăng ký nhận bản tin",
      modal_description:
        "Vui lòng nhập địa chỉ email của bạn để đăng ký nhận bản tin của chúng tôi.",
      money: "giảm giá 20% tiền",

      // About
      about_intro:
        "Tôi tên là Nguyễn Xuân Phát, sinh năm 2005, là một người đam mê lập trình. Là người đã tạo ra Nông sản Sạch, một trang web thương mại điện tử chuyên cung cấp các sản phẩm nông sản sạch và an toàn.",

      faq: "(FAQ)",
      faq_q1: "Làm thế nào để đặt hàng?",
      faq_a1: "Bạn có thể thêm sản phẩm vào giỏ hàng và tiến hành thanh toán.",
      faq_q2: "Chính sách đổi trả hàng hóa như thế nào?",
      faq_a2:
        "Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày nếu sản phẩm còn nguyên vẹn.",
      faq_q3: "Tôi có thể thanh toán bằng phương thức nào?",
      faq_a3:
        "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng và tiền mặt khi nhận hàng.",

      //Contact
      contact_title: "Liên hệ với chúng tôi",
      contact_notification: "Tin nhắn của bạn đã được gửi đi thành công!",
      contact_notification_error: "Đã xảy ra lỗi khi gửi tin nhắn.",
      contact_desc1:
        "Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, hãy thoải mái liên hệ với chúng tôi.",
      contact_desc2:
        "Giải quyết vấn đề của bạn với đội ngũ hỗ trợ của chúng tôi.",
      contact_address: "Cao Thọ, Cao Đức, Bắc Ninh",
      contact_email: "masterrio2412@gmail.com",
      contact_phone: "+84 983549821",

      contact_name_placeholder: "Tên của bạn",
      contact_email_placeholder: "Email của bạn",
      contact_subject_placeholder: "Chủ đề của bạn",
      contact_message_placeholder: "Nội dung tin nhắn của bạn...",
      contact_button: "Gửi tin nhắn",

      // shop
      all_category: "Tất cả danh mục",
      price: "Giá cả",
      evaluate: "Đánh giá",
      discount: "Giảm giá",

      data_loading: "Đang tải dữ liệu đơn hàng...",
      data_error: "Không tìm thấy đơn hàng",
      data_information: "Thông tin đơn hàng",
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
