 const jwt=require("jsonwebtoken");
const { blacklistTokenModel } = require("../Model/blacklist.model");


const auth=async (req,res,next)=>{
    const token=req.headers.authorization;
   
    if(token){
        const cheak=await blacklistTokenModel.findOne({token});
        if(cheak){
            res.status(200).json("Please Login Again !!");
        }else{
            jwt.verify(token, 'masai',(err, decoded)=> {
                req.body.userId=decoded.userId;
                req.body.name=decoded.name;
                if(decoded){
                   next();
                }else{
                    res.status(200).json({error:err});
                }
            })
        }
         
          
    }else{
        res.status(400).json({"msg":"You are not authorized"});
    }
}

module.exports={auth};