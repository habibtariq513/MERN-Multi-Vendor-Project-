const nodemailer = require("nodemailer");

const sendMail = async ({ email, subject, message }) => {
  const host = process.env.SMPT_HOST || process.env.SMTP_HOST;
  const port = process.env.SMPT_PORT || process.env.SMTP_PORT;
  const service = process.env.SMPT_SERVICE;
  const user = process.env.SMPT_MAIL || process.env.SMTP_USER;
  const password = process.env.SMPT_PASSWORD || process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !password) {
    throw new Error(
      "Email is not configured. Set SMPT_HOST, SMPT_PORT, SMPT_MAIL, and SMPT_PASSWORD."
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    service,
    auth: {
      user,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: user,
    to: email,
    subject,
    text: message,
  });
};

module.exports = sendMail;
