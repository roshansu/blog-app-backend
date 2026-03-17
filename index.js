import e from 'express'
import connectDb from './src/db/connectDb.js'
import postRouter from './src/routers/postRouter.js'
import userRouter from './src/routers/userRoute.js'
import cookieParser from 'cookie-parser'


const app = e()
const PORT = 5000
app.use(e.json())
app.use(cookieParser())

app.use('/posts', postRouter)
app.use('/user', userRouter)

connectDb()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is listening on ", PORT)
    })
})
.catch(console.error())