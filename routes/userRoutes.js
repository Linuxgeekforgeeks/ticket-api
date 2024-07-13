const express=require("express")

const router=express.Router()

router.post("/register",(req,res)=>{
    res.send("Your are registed Successfully.")
})
router.post("/login",(req,res)=>{
res.send("Your are Login Successfully.")
})


module.exports=router