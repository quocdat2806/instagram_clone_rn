const jwt = require('jsonwebtoken')

function genarateAccessToken(payload){
    const accessToken = jwt.sign({
        payload,

    },`${process.env.ACCESS_TOKEN_KEY}`,{expiresIn:'1h'})
    return accessToken


}
function genarateRefreshToken(payload){
    const refreshToken = jwt.sign({
        payload,
    },`${process.env.REFRESH_TOKEN_KEY}`,{expiresIn:'365d'})
    return refreshToken
}

module.exports  = {
    genarateAccessToken,
    genarateRefreshToken
}



