import mongoose from "mongoose";
const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.CONNECTION_STRING}/${process.env.DB_NAME}`)
        console.log("Database successfully connected to",connectionInstance.connection.host);
    }
    catch (e) {
    console.log("Failed to Connect to Data Error :",e);
    process.exit(1)// forgot this but we need to exit the process
    }
}

export default connectDb;