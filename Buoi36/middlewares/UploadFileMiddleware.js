
const multer = require('multer');
module.exports = (req, res, next) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage: storage }).single("myFile")
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.json(err)
            return
        } else if (err) {
            res.json(err)
            return
        }
        next()
        
      
          
    })
    
}

        
    
