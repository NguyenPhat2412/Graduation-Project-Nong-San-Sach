const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

const sendOrderConfirmationEmail = async (
  to,
  customerName,
  customerPhone,
  customerAddress,
  products,
  orderDate
) => {
  const productList = products
    .map((item) => {
      `- ${item.name} (Quantity: ${item.quantity}, Price: $${item.price})`;
      return `
      <table className="w-full border-collapse ">
              <thead>
                <tr className="">
                  <th className=" p-2">Image</th>
                  <th className=" p-2 w-60">Product</th>
                  <th className=" p-2">Price</th>
                  <th className=" p-2">Quantity</th>
                  <th className=" p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                  <tr key={item.id} className="text-center">
                    <td className="p-2">
                      <img
                        className="w-20"
                        src={${process.env.LOCALHOST_URL}${item.img}}
                        style="width: 100px; height: auto; border: 1px solid #ccc; margin-bottom: 5px;"
                      />
                    </td>
                    <td className=" p-2">${item.name}</td>
                    <td className=" p-2">${item.price}</td>
                    <td className=" p-2">
                     ${item.quantity}
                    </td>
                    <td className=" p-2">${item.price * item.quantity}</td>
                  </tr>
              </tbody>
            </table>`;
    })
    .join("<br>");
  const htmlContent = `
    <h3>Xin chào ${customerName}, </h3>
    <p>Chúng tôi đã nhận được đơn hàng của bạn với thông tin sau:</p>
    <p><strong>Tên khách hàng:</strong> ${customerName}</p>
    <p><strong>Số điện thoại:</strong> ${customerPhone}</p>
    <p><strong>Địa chỉ giao hàng:</strong> ${customerAddress}</p>
    <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Dưới đây là thông tin đơn hàng của bạn:</p>
    <p><strong>Ngày đặt hàng:</strong> ${orderDate}</p>
    <p><strong>Danh sách sản phẩm:</strong></p>
    <ul>
      ${productList} 
      </ul>
    <p><strong>Tổng tiền:</strong> ${products
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p> 
      <p>Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
      <p>Trân trọng,</p>
      <p>Đội ngũ hỗ trợ khách hàng</p>
      `;
  console.log(htmlContent);
  return transporter.sendMail({
    from: process.env.EMAIL_HOST,
    to: to,
    subject: "Xác nhận đơn hàng",
    html: htmlContent,
  });
};

module.exports = { sendOrderConfirmationEmail };
