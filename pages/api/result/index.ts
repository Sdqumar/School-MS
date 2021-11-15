import result from "./model";
import connectDB from "../../../config/connectDB";

import type { NextApiRequest, NextApiResponse } from "next";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;

  if (auth) {
    if (req.method === "GET") {
      const doc  = req.body;
      
      const data = await getResults(doc.year,doc.id);
      res.status(200).json(data);
    } else if (req.method === "POST") {
      try {
        const { doc, docName } = req.body;

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
