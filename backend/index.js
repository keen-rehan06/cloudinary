import express from "express"
import uploadRoutes from "./routes/upload.route.js"
import cors from "cors"
import connectDb from "./config/db.config.js"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
;(async()=>{
    try {
        await connectDb();
    } catch (error) {
        console.log(`MongoDb connection Failed:❌`,error)
    }
})()
const app = express()
app.use(cors(
   {
     config:"http://localhost:5173"
   }
))
app.use("/", uploadRoutes);
app.use('/upload', express.static('public/upload'));
app.get("/",function(req,res){
res.send("Hello World!!")
})

app.listen(3000,()=>{
    console.log("App is runnig on port 3000")
})