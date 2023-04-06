const {userModel} =require("../model/user.model")
const express=require("express")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
userRouter.post("/signup",async(req,res)=>{
    const {email,password,confirm_Password}=req.body

    try{
    if(password==confirm_Password){

        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send(err.message)
            }
            else{
                const user=new userModel({email,password:hash,confirm_Password:hash})
                await user.save()
                res.send("user successfully registered")
            }
        })
    }
    else{
        res.send("password and confirm password should be same")
    }


    }
    catch(err){
        res.send("user not registered")

    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"eval")
                    res.send({"msg":"logged in","token":token})
                }
                else{
                    res.send({"msg":"password is wrong"})
                }
            })
        }

    }
    catch(err){
        res.send({"msg":"email/password is wrong","err":err.message})

    }
})

userRouter.get("/getProfile",async(req,res)=>{
   const getProfile=await userModel.find()
   res.send(getProfile)
})

module.exports={userRouter}