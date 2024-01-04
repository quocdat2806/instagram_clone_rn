const userService = require('../services/authService')


class AuthController {
    async createUser(req, res) {
        try {
            const user = req.body
            const response = await userService.createUser(user)
            return res.status(200).json(response)

        } catch (error) {
            return res.status(400).json(error)
        }


    }

   async loginUser() {
        try {
            const authData = req.body?.phone || req.body?.email
            const response = await userService.loginUser(authData)
            return res.status(200).json(response)

        } catch (error) {
            return res.status(400).json(error)
        }



    }



}

module.exports = new AuthController()