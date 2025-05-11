import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI ).then(async() => {
    console.log('Connected to database');

    }).catch((error) => {
    console.log(error);
})
};

export default connectDb;
