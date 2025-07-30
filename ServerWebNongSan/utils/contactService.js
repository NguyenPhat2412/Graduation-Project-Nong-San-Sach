const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendContactEmail = async (name, email, subject, message) => {
  const htmlContent = `
    <h3>Thông tin liên hệ từ ${name}</h3>
    <p><strong>Tên:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Chủ đề:</strong> ${subject}</p>
    <p><strong>Nội dung:</strong> ${message}</p>
  `;

  return transporter.sendMail({
    from: email,
    to: process.env.EMAIL_HOST,
    subject: `Liên hệ từ ${name}`,
    html: htmlContent,
  });
};

module.exports = {
  sendContactEmail,
};
