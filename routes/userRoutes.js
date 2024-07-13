const express=require("express")

const router=express.Router()

router.post("/register",async(req,res)=>{
    const {username,password}=req.body
    res.json({userinfo:[username,password]})
})
router.post("/login",(req,res)=>{
res.send("Your are Login Successfully.")
})


module.exports=router