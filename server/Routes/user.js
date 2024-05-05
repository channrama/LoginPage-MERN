const express=require("express")
const bcrypt=require("bcrypt")
const UserModel=require("../models/user.js")
const UserRouter=express.Router();
UserRouter.post("/signup",async(req,res)=>{

const{username,email,password}=req.body
const usermail=await UserModel.findOne({email})
const uname=await UserModel.findOne({username})
if(usermail||uname)
{
     res.send( "user already exists")
}
else{
    const hashpass=await bcrypt.hash(password,10);
    const newuser= new UserModel({username,email,password:hashpass,})
    newuser.save()
     res.send("Record registerd")
}

})
module.exports=UserRouter