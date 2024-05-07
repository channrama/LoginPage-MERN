const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.js");
const ForgetPassword = express.Router();


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dschannappa93@gmail.com', 
    pass: 'pcbb jzvv bsrl fran'
  }
});

ForgetPassword.post("/email", async (req, res) => {
    const { email } = req.body;
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
      user.resetPasswordToken = token;
      await user.save();
      const mailOptions = {
        from: 'dschannappa93@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://${req.headers.host}/reset/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ status: false, message: "Error sending email" });
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ status: true, message: "Email sent" });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Server Error" });
    }
});

module.exports = ForgetPassword;
