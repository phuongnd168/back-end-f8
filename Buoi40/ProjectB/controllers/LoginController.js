
module.exports = {
    index: async (req, res) => {
        
        if(req.headers.referer==="http://localhost:3001/login"){
            res.render("login/index", {error: "ClientId hoặc callback không tồn tại"})
            return
        }   
 
        res.render("login/index", {error:[]})
    }
}