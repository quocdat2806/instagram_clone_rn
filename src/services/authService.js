const { User } = require("../models/user")
const bcrypt= require('bcrypt')
const { genarateAccessToken, genarateRefreshToken } = require("./jwtService")

class AuthService {
    async createUser(user) {
        const email = user?.email
        const phone = user?.phone
        return new Promise(async (resolve, reject) => {
            try {
                const isAlreadyAuth = await User.findOne({ email, phone });
                if (!isAlreadyAuth) {
                    const dataUser = await User.create(user)
                    const accessToken = genarateAccessToken(user)
                    const refreshToken = genarateRefreshToken(user)
                    resolve({
                        data: dataUser,
                        accessToken,
                        refreshToken
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

    async loginUser(user){
        const email = user?.email
        const phone = user?.phone
        return new Promise(async (resolve, reject) => {
            try {

                const isHaveAuth = await User.findOne({ email, phone });
                if (isHaveAuth) {
                    const dataUser = await User.create(user)
                    resolve({
                        data: dataUser,
                    })

                } else {
                    reject({
                        message: 'Account or password not correct',
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