import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/connectDB";
import studentMock from "./studentMock.json";
import mongoose, { Schema } from "mongoose";

import { student as studentValues } from "../../student/signup";

const studentSchema = new Schema<studentValues>({
  admissionNo: {
    type: String,
    required: [true, "Please enter admission number"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please enter firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastName"],
  },

  //   class: {
  //     type:String,
  //     required:[ true, 'Please enter class'],
  //   },

  password: {
    type: String,
    required: [true, "Please enter a valid password"],
  },
});

export const student =
  mongoose.models.students || mongoose.model("students", studentSchema);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "production") {
    // const data= JSON.parse()
    try {
      await student.collection.drop();
      const user = await student.insertMany(studentMock);
      res.status(201).send("seed successfull");
    } catch (err) {
      console.log(err);
      res.status(403).send(err);
    }
  }
  res.status(401).send("unauthorized access");
};

export default connectDB(handler);
