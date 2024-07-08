import mongooes from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongooes.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL Not Found");
  if (isConnected) return console.log("Already Connected to MongoDB");

  try {
    await mongooes.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};
