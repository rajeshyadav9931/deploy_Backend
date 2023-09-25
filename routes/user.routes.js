const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../Model/user.model");
const { blacklistTokenModel } = require("../Model/blacklist.model");

const userRouter=express.Router();

userRouter.post("/register",(req,res)=>{
    const {name,email,gender,password}=req.body;

   try {
    bcrypt.hash(password, 6, async(err, hash)=> {
        if(hash){
            const user=new UserModel({name,email,gender,password:hash})
            await user.save();
            res.status(200).json({"msg":"User had been registered successfully!!"})
        }else{
            res.status(200).json({"error":err})
        }
    });
   } catch (error) {
      res.status(400).json({"error":error});
   }

})

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await UserModel.findOne({email});
        console.log(user);
        bcrypt.compare(password, user.password,(err, result)=> {
            const token=jwt.sign({ userId:user._id, name:user.name }, 'masai');
            if(result){
                res.status(200).json({"msg":"User login successfully!!",token});
            }else{
                res.status(200).json({"error":err});
            }
        });
    } catch (error) {
        res.status(400).json({"error":error})
    }

})

userRouter.get("/logout",async (req,res)=>{
    const token=req.headers.authorization;
   
    try {
        if(token){
            const cheakToken= await blacklistTokenModel.findOne({token});
             if(cheakToken){
                res.status(200).json({"msg":"token Already present"});
             }
             const blackLSToken=new blacklistTokenModel({token});
             await blackLSToken.save();
             res.status(200).json({"msg":"User Logged out successfully!!"});
        }
    } catch (error) {
        res.status(400).json({"error":error});
    }
})

module.exports={userRouter};
