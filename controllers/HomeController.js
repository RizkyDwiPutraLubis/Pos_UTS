class HomeController {
    static async home(req, res) {
      try {
        res.render('home', {
            layout: false
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = HomeController;