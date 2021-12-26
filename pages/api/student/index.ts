import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "../../../config/connectDB";
import { student } from "./model";

export async function getStudents(id?) {
    try{
        let  res = await student.find({}).select("-password");
        return res;
}
catch(err){
    return null
}

}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;
  
  if (auth) {
    const data = await getStudents();
    
    res.status(200).json(data);
  } else {
    res.status(401).send("unauthorized access");
  }
};

export default connectDB(handler);
