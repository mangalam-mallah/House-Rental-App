import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected at ${conn.connection.host} and ${conn.connection.name}`);
        

    } catch (error) {
        console.log("Database Connection Error: ", error)
    }    
}

export default connectDB;