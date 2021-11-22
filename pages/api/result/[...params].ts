import result from "./model";
import connectDB from "../../../config/connectDB";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user
try {
  if (auth) {
    if (req.method === "GET") {
      const year = req.query.params[0].toString();
      const id =  req.query.params[1];
      console.log(year,id);
      
      const [data] = await result(year).find({ id })
console.log(data);

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Result not found" });
      }
    }
  } else {
    res.status(401).send("unauthorized access");
  }
} catch (error) {
  console.log(error);
  res.status(500).json({error:{error:'connecting to mongodb atlas'}}) 
    
}
 
};

export default connectDB(handler);
