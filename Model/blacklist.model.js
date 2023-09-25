

const mongoose=require("mongoose");


const blacklistTokenSchema=mongoose.Schema({
    token:String
},{
    versionKey:false
})

const blacklistTokenModel=mongoose.model("blacklistToken",blacklistTokenSchema);


module.exports={blacklistTokenModel};