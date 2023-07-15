const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/register", async (req, res) => {
  const { email, name, product, contact, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "mail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "anupriya@scaleedge.in",
      to: email,
      subject: "Contact Form Submission",
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Product:</strong> ${product}</p>
             <p><strong>Contact:</strong> ${contact}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Failed to send email" });
      } else {
        console.log("Email sent successfully", info.response);
        res.status(201).json({ status: 201, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Failed to send email" });
  }
});

module.exports = router;
