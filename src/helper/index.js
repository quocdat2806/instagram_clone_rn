const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const firebase = require("../firebase/index.js");

const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            if (req.files && req.files.length > 0) {
                callback(null, './upload');
            }
        },
        
        filename: function (req, file, callback) {
            if (req.files && req.files.length > 0) {
                callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        }
    }),

    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(null, false);
        }
        callback(null, true);


    }
});




module.exports = {
    upload
};
