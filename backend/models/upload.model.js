import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    name:String,
    url:String
})