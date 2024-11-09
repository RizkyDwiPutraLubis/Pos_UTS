
const Users         = require("../models").Users;


const admin = async (req,res) => {

   try {
        const refreshToken  = req.cookies.refresh_token;
        const getUser       = await Users.findOne({where : {refresh_token : refreshToken}});
        console.log(getUser);
        let data = {
            "data" : "data"
        }
        res.render('admin/index', {
            // layout  : "layouts/admin/main",
            layout : false,
            title   : "Dashboard",
            user    : getUser,
            data : data,
            baseUrl : process.env.BASEURL
        });
       
        // console.log(data);
    } catch (error) {
       console.log(error)
    }
}
module.exports = {
    admin
}
