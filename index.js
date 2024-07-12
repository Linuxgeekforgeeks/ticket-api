const express=require("express");
const app=express()
const port=5000

app.listen(port,()=>{
    console.log("Our Server is running on the port "+port)
})