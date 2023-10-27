const path = require('path'); 
const { Op } = require("sequelize");
const model = require("../models/index");
const UploadFile = model.UploadFile;
const User = model.User;
const jwt = require("jsonwebtoken");
module.exports = {
    upload: async (req, res) => {
        const file = req.file
        if (!file) {
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
        const upload = await UploadFile.findOne({
           where: {
            [Op.and]: [{ url: path.join(__dirname, "../public/uploads/"+file.filename)}, { user_id: userId }], 
           }    
        })
        console.log(upload)
        if(!upload){
            await UploadFile.create({url: path.join(__dirname, "../public/uploads/"+file.filename), user_id: userId})
        }
      
        res.json({
            message: "Success",
            data: file
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