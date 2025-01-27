import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const ConnectToDB = async() => {
    try {
       const connection =  await mongoose.connect(process.env.MONGODB_URL)

       if(connection){
        console.log("MONGODB database connected successfully!!! " , mongoose.connection.host)
       }

    } catch (error) {
        console.log("Error occured while connecting to MONGODB database!!! " , error.message);
    }
}