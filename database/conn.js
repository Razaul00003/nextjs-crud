import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState == 1) {
      console.log("db connected");
    }
  } catch (errors) {
    console.log(errors);
    console.log("connection error from conn.js");
    return Promise.reject(errors);
  }
};

export default connectMongo;
