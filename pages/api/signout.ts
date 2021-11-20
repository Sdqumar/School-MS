import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const cookieOptions = {
  httpOnly: true,
  maxAge: 1,
  path:'/',
  secure: process.env.NODE_ENV === "production",
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 

  return res.status(202).json({ message: "logout successfull" });
};

export default handler;
