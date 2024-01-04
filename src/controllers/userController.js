const userService = require('../services/authService')
const firebase = require("../firebase/index.js");

class UserController {
    async createPost(req, res) {
        try {
            if (req.files && req.files.length > 0) {
                const file = req.files[0]; 
                const fileName = file.originalname; 
                const blob = firebase.bucket.file(fileName);
                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
    
                blobWriter.on("finish", () => {
                    console.log('ghi xong');
                });
    
                blobWriter.end(file.buffer);
                console.log('ghi xong r');
            } else {
                console.log('No files uploaded.');
            }
    
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
    async createVideo(req, res) {
        try {
            const user = req.body
            const response = await userService.createUser(user)
            return res.status(200).json(response)

        } catch (error) {
            return res.status(400).json(error)
        }
    }




}

module.exports = new UserController()