import mongoose from 'mongoose';
// This file is responsible for connecting to the MongoDB database using Mongoose
// It exports a function that can be called to establish the connection
export const connectDB=async()=>{
try{
await mongoose.connect(process.env.MONGO_URI);      // Use the MONGO_URI environment variable to connect to MongoDB
// The MONGO_URI should be defined in the .env file
console.log("MONGODB CONNECTED SUCCESSFULLY!");
}catch(error){
console.log("Error connecting to MONGODB",error);
process.exit(1); // Exit the p  rocess with failure
}
}