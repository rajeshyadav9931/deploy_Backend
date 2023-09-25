const express=require("express");
const {auth}=require("../Middleware/auth.middleware");

const { PostModel } = require("../Model/post.model");

const postRouter=express.Router();

postRouter.post("/add",auth,async(req,res)=>{
    const payload=req.body;

   try {
       const post=new PostModel(payload)
        await post.save();
        res.status(200).json({"msg":"Post created successfully!!"});
   } catch (error) {
      res.status(400).json({"error":error});
   }
})

postRouter.get("/",auth, async(req,res)=>{
    const query=req.query;
 
    try {
        const posts=await PostModel.find(query);
        console.log(posts)
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({"error":error});
    }

})


postRouter.patch("/update/:postId",auth, async(req,res)=>{
    const {postId}=req.params;
    const payload=req.body;
    
    try {
        const post=await PostModel.findOne({"_id":postId});
     
        if(req.body.userId===post.userId){
             await PostModel.findByIdAndUpdate({"_id":postId},payload);
             res.status(200).json({"msg":`post with postId ${postId} has been updated`});
        }
    } catch (error) {
        res.status(400).json({"error":error});
    }

})

postRouter.delete("/delete/:postId",auth, async(req,res)=>{
    const {postId}=req.params;
   
    
    try {
        const post=await PostModel.findOne({"_id":postId});
     
        if(req.body.userId===post.userId){
             await PostModel.findByIdAndDelete({"_id":postId});
             res.status(200).json({"msg":`post with postId ${postId} has been deleted`});
        }
    } catch (error) {
        res.status(400).json({"error":error});
    }

})



module.exports={postRouter};
