const authRouter = require("./authRouter")
const userRouter = require("./userRouter")

function router(app){
app.use('/auth',authRouter)
app.use('/user',userRouter)

}

module.exports = router

