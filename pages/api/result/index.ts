import result from "./model";
import connectDB from "../../../config/connectDB";

import type { NextApiRequest, NextApiResponse } from "next";

export async function getResults(collectionName=2021,id) {
  try {
    console.log('getresult');
    const data = await result(collectionName).find({id});
console.log(data);

    return data;
  } catch (err) {
    return null;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;

  if (auth) {
    if (req.method === "GET") {
      const doc  = req.body;
      console.log(doc);
      
      const data = await getResults(doc.year,doc.id);
      res.status(200).json(data);
    } else if (req.method === "POST") {
      try {
        const { doc, docName } = req.body;
console.log(doc,docName);

        const response = await result(docName).create({ ...doc });

        res.status(201).json(response._id);
      } catch (err) {
        console.log(err);

        res.status(403).json({ error: "error creating subject" });
      }
    }
  } else {
    res.status(401).send("unauthorized access");
  }
};

export default connectDB(handler);
