//imports
const express = require("express");
const mongoose  = require("mongoose");
const app = express();
require("dotenv").config({ path: './config/.env' });
const User = require("./models/User.js")

//middleware
app.use(express.json()); 



//routes
app.get("/", async (req,res)=> {
    try{
        const users= await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.post("/",async (req,res)=>{
   try{
    const newUser = await User.create(req.body);
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
   }catch(err){
    res.status(500).json({message: err.message});
   }
});

app.put("/:id",async (req,res)=>{
    try{
     const { id } = req.params;
     const user = await User.findByIdAndUpdate(id,req.body);
     if(!user){
        return res.status(404).json({message: "user not found"});
     }
     const updatedUser = await User.findById(id);
     res.status(200).json(updatedUser);
    }catch(err){
     res.status(500).json({message: err.message});
    }
 });

app.delete("/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
           return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "User deleted successfully" });
       }catch(err){
        res.status(500).json({message: err.message});
       }
});

//connect to mongodb and start the server
const port =  process.env.PORT  || 3000;
 mongoose
    .connect(process.env.MONGO_URI)
    .then( ()=>{
        console.log("Database connected successfully")
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
          });
    })
    .catch((err)=>{
        console.error("connection error: ", err)
    }) 


