import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validate from "../utils/validate.js"
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    try{
        const {email, password} = req.body
        validate(req.body)
        req.body.password = await bcrypt.hash(password, 10)
        const user = await User.create(req.body)
        const token = jwt.sign({_id: user._id, email}, process.env.JWT_KEY, {expiresIn: '30d'} )
        res.cookie("token", token)
        res.send("register success")

    }catch(err){
        console.log(err)
        res.send(err)
    }
}

export const login = async (req, res) =>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            res.send("Invalid email or password")
            return
        }

        console.log(user)

        const isTrue = await bcrypt.compare(password, user.password)
        if(!isTrue){
            res.send("Invalid password")
            return
        }

        const token = jwt.sign({_id: user._id, email}, process.env.JWT_KEY, {expiresIn: "30d"})
        res.cookie("token", token)
        res.send("Login success")
    }catch(err){
        console.log(err)
        res.send(err)
    }

}

export const logout = async (req, res) => {

}