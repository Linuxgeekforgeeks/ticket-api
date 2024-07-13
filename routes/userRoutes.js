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
    res.json(results);
    try {
        
    } catch (error) {
        console.log(error)
    }
    res.json({userinfo:[username,password]})
})
router.post("/login",(req,res)=>{
res.send("Your are Login Successfully.")
})


module.exports=router