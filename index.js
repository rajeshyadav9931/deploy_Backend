const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");


const app=express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json("Home Page");
})

app.use("/users",userRouter);
app.use("/posts",postRouter);





app.listen(8080,async()=>{
    try {
        await connection
        console.log("DB is connected")
        console.log("server is running at port 8080")
    } catch (error) {
        console.log(error);
    }
})