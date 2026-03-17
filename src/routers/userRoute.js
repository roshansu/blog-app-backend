import e from 'express'
import { register, login, logout } from '../controller/userAuth.js'

const userRouter = e.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter