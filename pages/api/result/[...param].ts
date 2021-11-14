import result from "./model";
import connectDB from "../../../config/connectDB";

import type { NextApiRequest, NextApiResponse } from "next";

export async function getResults(collectionName=2021,id) {
  try {
    console.log(collectionName,id);
    const res = await result('2021').find({});
console.log(res);
console.log('got data');

    return res;
  } catch (err) {
    return null;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;

  if (auth) {
    if (req.method === "GET") {
      const year  =  await req.query.param['year']
      const id  =  await req.query.param[1]
      
      const data = await getResults(year,id);
      console.log(data);
      
     res.status(200).json(data);
    } 
  } else {
    res.status(401).send("unauthorized access");
  }
};

export default connectDB(handler);
