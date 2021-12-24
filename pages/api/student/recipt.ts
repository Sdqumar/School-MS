import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/connectDB";
import  mongoose,{Schema} from 'mongoose';

const ReciptSchema = new Schema({}, { strict: false });
const Repicpt = mongoose.models.payment || mongoose.model('payment', ReciptSchema,"payment" );

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const auth = req.cookies.user;
  if (auth) {
    const {studentId} = req.body
    const data = await Repicpt.find({studentId})
    
    res.status(200).json(data);
  } else {
    res.status(401).send("unauthorized access");
  }
};

export default connectDB(handler);
