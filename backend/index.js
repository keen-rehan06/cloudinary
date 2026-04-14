import express from "express"
import uploadRoutes from "./routes/upload.route.js"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
const app = express()
app.use("/upload", uploadRoutes);

app.get("/",function(req,res){
res.send("Hello World!!")
})

app.listen(3000,()=>{
    console.log("App is runnig on port 3000")
})