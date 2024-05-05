const express=require("express")
const bcrypt=require("bcrypt")
const UserModel=require("../models/user.js")
const UserRouter=express.Router();
UserRouter.post("/login",async(req,res)=>{

const{username,email,password}=req.body
const usernameexits=await UserModel.findOne({username})
if(usernameexits)
{
   
}
else{
    const hashpass=await bcrypt.hash(password,10);
    const newuser= new UserModel({username,email,password:hashpass})
    newuser.save()
     res.send("Record registerd")
}

})
module.exports=UserRouter