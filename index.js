const express=require("express");
const mongoose=require("mongoose")
const app=express()
const port=5000

const connectToMongo=()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}

connectToMongo();


app.listen(port,()=>{
    console.log("Our Server is running on the port "+port)
})