
const Users                 = require("../models").Users;
const bcrypt                = require("bcrypt");
const jwt                   = require("jsonwebtoken");
const {validationResult}    = require('express-validator');

class AuthController {
    static async register(req, res) {
      try {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          console.log(errors);
          req.flash('msg', "Registration Failed, please check again");
          return res.redirect('/register');
        }
  
        const { fullname, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
  
        await Users.create({
          fullname,
          email,
          password: hashPassword,
          role_id: 2, // Assuming user role is 2 for registration
        });
  
        req.flash('msg', "Registration Complete, Please login to continue");
        res.redirect('/login');
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" }); // Handle errors more gracefully
      }
    }
  
    static async login(req, res) {
      try {
        if (!req.body.email) {
          req.flash('msg', 'Please enter your email address.');
          return res.redirect('/login');
        }
  
        const user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) {
          req.flash('msg', "Email Anda Tidak Terdafar");
          return res.redirect("/login");
        }
  
        const check = await bcrypt.compare(req.body.password, user.password);
  
        if (!check) {
          req.flash('msg', "Password Anda Salah");
          return res.redirect("/login");
        }
  
        const user_id = user.id;
        const nama = user.fullname;
        const email = user.email;
  
        const accessToken = jwt.sign(
          { user_id, nama, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10m' }
        );
        const refreshToken = jwt.sign(
          { user_id, nama, email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );
  
        await Users.update(
          { refresh_token: refreshToken },
          { where: { id: user_id } }
        );
  
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
  
        console.log(accessToken);
        res.redirect('/admin/');
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Invalid credentials" }); // Handle errors more gracefully
      }
    }
  
    static async logout(req, res) {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) return res.redirect("/login");
  
      const user = await Users.findOne({ where: { refresh_token } });
      if (!user) return res.redirect("/login");
  
      const user_id = user.id;
      await Users.update({ refresh_token: null }, { where: { id: user_id } });
  
      res.clearCookie('refresh_token');
      res.redirect('/');
    }
  }
  
  module.exports = AuthController;