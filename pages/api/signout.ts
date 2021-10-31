import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const cookieOptions = {
  httpOnly: true,
  maxAge: 1,
  path:'/',
  secure: process.env.NODE_ENV === "production",
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", serialize("jwt", "", cookieOptions));

  return res.status(200).json({ message: "logout successfull" });
};

export default handler;
