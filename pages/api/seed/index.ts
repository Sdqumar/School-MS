import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/connectDB";
import studentMock from "./studentMock.json";
import staffMock from "./staffMock.json";
import { staff } from "../staff/model";
import { student } from "../student/model";




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "production") {
    try {
       await student.collection.drop();
       await staff.collection.drop();
  await student.insertMany(studentMock);
       await staff.insertMany(staffMock);
      res.status(201).send("seed successfull");
    } catch (err) {
      console.log(err);
      res.status(403).send(err);
    }
  }
  res.status(401).send("unauthorized access");
};

export default connectDB(handler);
