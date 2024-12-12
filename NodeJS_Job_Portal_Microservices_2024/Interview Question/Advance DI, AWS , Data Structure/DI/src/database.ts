import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect("mongodb://127.0.0.1/blog");
    console.info("connected to DB");
  } catch (error) {
    console.log(`conection error: ${error} on Worker process: ${process.pid}`);
    process.exit(1);
  }
};

export default connectDB;
