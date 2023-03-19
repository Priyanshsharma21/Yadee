import User from '../models/user.js'
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const signin = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json({message : "User not found."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({message : 'Invailed password'})

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, 'ipsEvent', {expiresIn: '1h'})

        res.status(200).json({result : existingUser, token})

    } catch (error) {
        res.status(500).json({message : 'Something went wrong'})
    }
}

export const signup = async(req,res)=>{
    const {email, password, firstName, lastName, confirmPassword, isAdmin} = req.body;
    console.log({email, password, firstName, firstName, confirmPassword,isAdmin})

    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(404).json({message : "User already exist."})

        if(password!==confirmPassword) return res.status(400).json({message : "Password don't match."})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password : hashedPassword, name : `${firstName} ${lastName}`, isAdmin : isAdmin})

        const token = jwt.sign({email : result.email, id: res._id}, 'ipsEvent', {expiresIn:'1h'})
        
        console.log(result)

        res.status(200).json({result : result, token})

    } catch (error) {
        res.status(500).json({message : 'Something went wrong'})
    }
}
