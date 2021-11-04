import mongoose, { Schema } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/connectDB";

type subjectValue = {
  subjects: [String];
};

const subjectSchema = new Schema<subjectValue>({
  subjects: {
    type: [String],
    required: [true, "Please enter Subject name"],
    unique: true,
  },
});

const subject =
  mongoose.models.subject || mongoose.model("subject", subjectSchema);

export async function getSubjects() {
  try {
    const data = await subject.find({});
    return data;
  } catch (err) {
    return null;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;

  if (auth) {
    if (req.method === "GET") {
      const data = await getSubjects();
      res.status(200).json(data);
    } else if (req.method === "POST") {
      try {
        const data = req.body;

        const response = await subject.findOneAndUpdate(
          {},
          { $addToSet: { subjects: data.subject } },
          { upsert: true,new:true,lean:true },
        )
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
