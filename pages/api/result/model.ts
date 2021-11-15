import mongoose, { Schema } from "mongoose";

import { result as resultTypes } from "../../results";

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
    unique: true,
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

const result = (name) => {
  
  return mongoose.models[name]|| mongoose.model(name, resultSchema);
}

export default  result

