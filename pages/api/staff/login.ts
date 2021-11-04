import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import connectDB from "../../../config/connectDB";
import { serialize, CookieSerializeOptions } from "cookie";
import {  staff } from "./model";

//handle errors
const handleErrors = (err) => {
  let errors = { staffID: "", password: "" };
  console.log(err);

  if (err.message === "incorrect staff ID") {
    errors.staffID = "incorrect staff ID";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "incorrect password";
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
    const { staffID, password } = req.body;

    try {
      const user = await staff.findOne({staffID });

      console.log(user);

      if (user) {
        const validPassword = await argon2.verify(user.password, password);
        const validstaffID = staffID === user.staffID;

        if (validstaffID) {
          if (validPassword) {
            const token = await createToken(user._id);

            setCookie(res, "jwt", token, cookieOptions);
            res.setHeader('WWW-Authenticate', 'Basic');
            return res.status(201).send(JSON.stringify(user._id));
          }
          throw Error("incorrect password");
        }
        throw Error("incorrect staff ID");
      }
      throw Error("incorrect staff ID");
    } catch (err) {
      const errors = handleErrors(err);
      res.status(403).json({ errors });
    }
  }
  res.status(401).send("unauthorized access");
};

export default connectDB(handler);
