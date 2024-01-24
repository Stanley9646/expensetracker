const mongoose =require('mongoose');
require("dotenv").config()
const db = async ()=>{
    try {
        mongoose.set("strictQuery", false)
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected")
        
    } catch (error) {
        console.log("DATABASE IS not connected")
        
    }
} 

module.exports= db;