const { User } = require("../models/user")
const bcrypt= require('bcrypt')
const { genarateAccessToken } = require("./jwtService")

class AuthService {
    async createUser(user) {
        const email = user?.email
        const phone = user?.phone
        return new Promise(async (resolve, reject) => {
            try {
                const isHasEmail = await User.findOne({ email, phone });
                if (!isHasEmail) {
                    const dataUser = await User.create(user)
                    const accessToken = genarateAccessToken(user)
                    resolve({
                        data: dataUser,
                        accessToken
                    })

                } else {
                    reject({
                        message: 'The email or phone is have aldready',
                    })

                }



            } catch (error) {
                console.log(error)

                reject({
                    message: 'Have error when create user',
                })
            }

        })


    }

    async loginUser(){
        const email = user?.email
        const phone = user?.phone
        return new Promise(async (resolve, reject) => {
            try {

                const isHasEmail = await User.findOne({ email, phone });
                if (!isHasEmail) {
                    const dataUser = await User.create(user)
                    resolve({
                        data: dataUser,
                    })

                } else {
                    reject({
                        message: 'The email is have aldready',
                    })

                }



            } catch (error) {

                reject({
                    message: 'Have error when create user',
                })
            }

        })
    }
}
module.exports = new AuthService()