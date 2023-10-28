const path = require('path'); 
const { Op } = require("sequelize");
const model = require("../models/index");
const UploadFile = model.UploadFile;
const User = model.User;
const jwt = require("jsonwebtoken");
module.exports = {
    upload: async (req, res) => {
        const files = req.files['myFile']

        if (!files) {
            res.status(400).json({
                error: "Error",
                message: 'Please upload a file'
            })
            return 
        }
        const { JWT_SECRET } = process.env;
        const authorization = req.headers["authorization"];
        const token = authorization.replace("Bearer", "").trim();
        const decoded = jwt.verify(token, JWT_SECRET);
        const { userId } = decoded.data;
        files.forEach(async (file) => {
            const upload = await UploadFile.findOne({
                where: {
                 [Op.and]: [{ url: path.join(__dirname, "../public/uploads/"+file.filename)}, { user_id: userId }], 
                }    
             })
     
             if(!upload){
                 await UploadFile.create({url: path.join(__dirname, "../public/uploads/"+file.filename), user_id: userId})
             }
           
        });
    
        res.json({
            message: "Success",
            data: files
        })
    },
    getData: async (req, res) => {
        const { JWT_SECRET } = process.env;
        const authorization = req.headers["authorization"];
        const token = authorization.replace("Bearer", "").trim();
        const decoded = jwt.verify(token, JWT_SECRET);
        const { userId } = decoded.data;
        const data = await UploadFile.findAll({
            where: {
                user_id: userId
            }
        })
        res.json({
            success: "Success",
            data: data
        })
    }
}