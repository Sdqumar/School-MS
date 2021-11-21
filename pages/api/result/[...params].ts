import result from "./model";
import connectDB from "../../../config/connectDB";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;

  if (auth) {
    if (req.method === "GET") {
      const year = await req.query.params[0].toString();
      const id = await req.query.params[1];
      
      const[data]= await result(year).find({ id });
if(data){
  res.status(200).json(data);
}else{
  res.status(404).json({error:"Result not found"});
}
    }
  } else {
    res.status(401).send("unauthorized access");
  }
};

export default connectDB(handler);
