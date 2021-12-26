import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/connectDB";
import { staff } from "./model";

export async function getStaffs() {
    try{
  const staffs = await staff.find({}).select("-password");
  return staffs;
}
catch(err){
    return null
}

}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.cookies.user;
  if (auth) {
    const data = await getStaffs();
    res.status(200).json(data);
  } else {
    res.status(401).send("unauthorized access");
  }
};

export default connectDB(handler);
