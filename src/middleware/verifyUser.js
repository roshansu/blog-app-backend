import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'
dotenv.config()

const verifyUser = async (req, res, next) =>{
    try{
        const {token} = req.cookies || {}
        // console.log(token)
        if(!token){
            res.send("user does not exist")
            return;
        }
        const payload = jwt.verify(token, process.env.JWT_KEY)
        // console.log(payload)
        const data = await User.findOne({_id: payload._id})
        if(!data){
            res.send("Invalid user")
            return
        }

        req.result = data
        next()
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

export default verifyUser