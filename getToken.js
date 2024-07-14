const jwt=require("jsonwebtoken")
require("dotenv").config()
 const  generateAccessToken=(user) =>{
    const payload = {
      id: user.id,
    };
    
    const secret = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '1h' };
  
    return jwt.sign(payload, secret, options);
  }


module.exports={generateAccessToken}