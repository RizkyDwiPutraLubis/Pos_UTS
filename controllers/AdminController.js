
const Users         = require("../models").Users;
const Roles         = require("../models").Roles;


class AdminController {
    static async admin(req, res) {
      try {
        const refreshToken = req.cookies.refresh_token;
        const user = await Users.findOne({ where: { refresh_token: refreshToken },
            include: [
                {
                    model: Roles,
                    attributes:['role_name']
                },
            ]
         });
        console.log(user);
  
        const data = {
          data: "data"
        };
  
        res.render('admin/', {
          layout: "admin/layouts/",
          title: "Dashboard",
          user,
          data,
          menu : "dashboard",
          baseUrl: process.env.BASEURL
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = AdminController;
