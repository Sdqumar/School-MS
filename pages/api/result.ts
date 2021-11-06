import mongoose, { Schema } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/connectDB";
import { result as resultTypes } from "../results";

const resultSchema = new Schema<resultTypes>({
  studentName: {
    type: String,
    required: [true, "Please enter student name"],
  },
  class: {
    type: String,
    required: [true, "Please enter class"],
  },
  id: {
    type: String,
    required: [true, "Please enter id"],
    unique:true
  },
  term: {
    type: String,
    required: [true, "Please enter term"],
  },
  subject: [
    {
      name: {
        type: String,
        required: [true, "Please enter subject name"],
      },
      firstCA: {
        type: Number,
        required: [true, "Please enter firstCA"],
      },
      secondCA: {
        type: Number,
        required: [true, "Please enter  secondCA"],
      },
      examScore: {
        type: Number,
        required: [true, "Please enter  examScore"],
      },
      totalScore: {
        type: Number,
        required: [true, "Please enter totalScore"],
      },
      grade: {
        type: String,
        required: [true, "Please enter grade"],
      },
      remark: {
        type: String,
        required: [true, "Please enter remark"],
      },
    },
  ],
});

const result =
  mongoose.models.result || mongoose.model("result", resultSchema);

export async function getResults() {
  try {
    const data = await result.find({});
    return data;
  } catch (err) {
    return null;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;

  if (auth) {
    if (req.method === "GET") {
      const data = await getResults();
      res.status(200).json(data);
    } else if (req.method === "POST") {
      try {
        const data = req.body;
console.log(data);

       const response = await result.create({...data})
        console.log(response);

        res.status(201).json(response);
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
