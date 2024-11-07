const express         = require('express');
const dotenv          = require('dotenv');
const expressLayouts  = require('express-ejs-layouts');
const flash           = require('connect-flash');
const session         = require('express-session');
const cookieParser    = require('cookie-parser');
const methodOverride  = require('method-override')
const app = express()


app.get('/',(req,res) => {

})

app.listen(3000)
