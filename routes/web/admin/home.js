const express       = require('express')
const router        = express.Router();
const verifyToken   = require("../../../middleware/verifyToken")
const {admin}        = require('../../../controllers/AdminController')


router.get('/admin', verifyToken, admin);



module.exports = router;
