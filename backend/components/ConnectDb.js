import mongoose from "mongoose";


const ConnectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log("Connected to database")
    }
  } catch (error) {
    console.log(error + "Network error: " + error)
  }
}

export default ConnectDb