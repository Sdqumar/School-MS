import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
   
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  try {
    
  
  await mongoose.connect(process.env.DB_URL, {})
    return handler(req, res)
  } catch (error) {
   console.log(error);
  }
  
  }

export default connectDB;