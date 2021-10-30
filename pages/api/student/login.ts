import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import connectDB from "../../../config/connectDB";
import { serialize, CookieSerializeOptions } from "cookie";
import { student } from "./model";

//handle errors
const handleErrors = (err) => {
  let errors = { AdmissionNo: "", password: "" };
  console.log(err);

  if (err.message === "incorrect Admission No") {
    errors.AdmissionNo = "incorrect Admission No";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  }

  return errors;
};

const maxAge = 3 * 24 * 120;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const cookieOptions = {
  httpOnly: true,
  maxAge: maxAge * 3,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { admissionNo, password } = req.body;

    try {
      const user = await student.findOne({ admissionNo });

      console.log(user);

      if (user) {
        const validPassword = await argon2.verify(user.password, password);
        const validAdmissionNo = admissionNo === user.admissionNo;

        if (validAdmissionNo) {
          if (validPassword) {
            const token = createToken(user._id);

            setCookie(res, "jwt", token, cookieOptions);

            return res.status(200).send(JSON.stringify(user._id));
          }
          throw Error("incorrect password");
        }
        throw Error("incorrect Admission No");
      }
      throw Error("incorrect Admission No");
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
  res.status(400).send("unauthorized access");
};

export default connectDB(handler);
