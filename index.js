const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser=require("body-parser")
const userRoute=require("./routes/userRoutes")

// Variables
const app = express();

dotenv.config();
const port = 5000;


//middleware
app.use(bodyParser.json())
app.use(express.json())

//Routes
app.use("/api/auth/",userRoute)
app.get("/api/hello", (req, res) => {
  const name = req.query;
  console.log(name)
  res.send("Hello People on Youtube." + name);
});

app.get("/api/users", (req, res) => {
  res.json({
    "users": [
      { username: "codeWithMudi", About: "This is me codeWithMudi." },
      { username: "John Doe", About: "This is me John Doe" },
    ],
  });
});

const connectToMongo = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDb Successfully.")
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();

app.listen(port, () => {
  console.log("Our Server is running on the port " + port);
});
