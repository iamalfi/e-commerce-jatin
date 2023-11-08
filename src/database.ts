// src/database.ts
import mongoose from "mongoose";

async function connectToDatabase(DB_URI: string, DB_NAME: string) {
    try {
        await mongoose.connect(DB_URI, {
            dbName: DB_NAME,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToDatabase;
