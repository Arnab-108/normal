const express = require("express")
const {authModel} = require("../Model/auth.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {name,email,password,age} = req.body
    try {
        bcrypt.hash(password,5, async(err,hash)=>{
            const data = authModel({name,email,password:hash,age})
            data.save()
            res.status(200).send({"msg":"New User Added" , "user":req.body})
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

authRouter.post("/login" , async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await authModel.findOne({email})
        console.log(user)

        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({authorId:user._id , author:user.name} , "noteapp",{
                        expiresIn:"7d"
                    })
                    res.status(200).send({"msg":"Login Successfull" , "token":token})
                }
                else{
                    res.status(400).send({"err":"Invalid User Details"})
                }
            })
        }
        else{
            res.status(200).send({"msg":"Please Enter the Correct Details!"})
        }
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

module.exports={authRouter}