const express           = require('express');
const router            = express.Router();

//Back
const authRouter        = require("./api/auth.js")

// Front
const dashboardRouter   = require("./web/dashboard")
const loginRouter       = require("./web/login.js")
const registerRouter    = require("./web/register.js")
const adminRouter       = require("./web/admin/home")

// api
router.use("/",      authRouter);


// Front 
router.use("/",         dashboardRouter);
router.use("/login",    loginRouter);
router.use("/register", registerRouter);
router.use("/",         adminRouter);
module.exports = router;
