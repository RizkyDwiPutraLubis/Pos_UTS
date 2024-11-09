const express       = require('express')
const router        = express.Router();
const verifyToken   = require("../../../../middleware/verifyToken")
const {listUsers}        = require('../../../../controllers/PeopleController')


router.get('/list-users', verifyToken, listUsers);



module.exports = router;
