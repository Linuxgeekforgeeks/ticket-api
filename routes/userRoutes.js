const express=require("express")
const User=require("../models/userModel")
const bcrypt=require('bcrypt')

const router=express.Router()

router.post("/register",async(req,res)=>{
    const {username,password}=req.body

    const saltRounds=10;
        const user= await User.findOne({username});
    if(user){
       return res.status(400).json("user already Taken")
    }

    const hashPassword=await bcrypt.hash(password,saltRounds)


    const userData= await User({username,password:hashPassword})
    const results=await userData.save()
    res.json(results)
    res.json({message:"User Registered Sucessfully"});
    try {
        
    } catch (error) {
        console.log(error)
    }
})
router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const existingUser= await User.findOne({username})
    if(!existingUser){
        res.status(400).json("User Does not Exists.")
    }


    const hashedPassword=existingUser.password
    const isCorrectPass=await bcrypt.compare(password,hashedPassword)
    if(!isCorrectPass){
        res.json({message:"Wrong Credentials"})
    }


})


module.exports=router