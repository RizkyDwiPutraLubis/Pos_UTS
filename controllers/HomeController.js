

const home = async (req,res) => {
   try {
        res.render('/views/index.html');
    } catch (error) {
       console.log(error)
    }
}
module.exports = {
    home
}
