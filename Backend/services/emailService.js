const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUserCredentials = async (
  email,
  username,
  password,
  role
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "CodeCare Account Created",

    html: `
      <h2>Welcome to CodeCare</h2>

      <p>Your account has been created successfully.</p>

      <table border="1" cellpadding="8">
        <tr>
          <td><b>Username</b></td>
          <td>${username}</td>
        </tr>

        <tr>
          <td><b>Password</b></td>
          <td>${password}</td>
        </tr>

        <tr>
          <td><b>Role</b></td>
          <td>${role}</td>
        </tr>
      </table>

      <br>

      <p>Please change your password after first login.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendUserCredentials,
};