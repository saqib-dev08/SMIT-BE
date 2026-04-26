import mongoose from "mongoose";
import dotenv from 'dotenv';

export const connectDB = async () => {
    
    let con = await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Db is connected!", con.connection.host);

}



