import mongoose from "mongoose";


let isConnected = false;

const connectDB=async ()=>{
    if(isConnected){
        return;
    }

    mongoose.connection.on('connected',()=>{
        console.log("DB_Connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    isConnected = true;
}
export default connectDB;
