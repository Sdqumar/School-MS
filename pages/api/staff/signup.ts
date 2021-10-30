import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import {staff} from './model'
import connectDB from '../../../config/connectDB';
import { serialize,CookieSerializeOptions } from "cookie";



//handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "Staff ID already registered";
    return errors;
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
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
  maxAge,
  secure: process.env.NODE_ENV === "production",
};
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
   if (req.method === 'POST') {
  const data = req.body;
console.log({data})
    
  try {
        const user = await staff.create({...data });
console.log(user)
        
        const token = await createToken(user._id);
        setCookie(res, 'User', token, cookieOptions)
        res.status(201).json({ user_id: user._id, email: user.email });
      } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      }
  
  }
res.status(400).send('unauthorized access');

}


  export default connectDB(handler);
