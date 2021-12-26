import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = process.cwd() + "/pages/api/payment.json";
  const payment = req.body;
  

  if (req.method === "POST") {
  const  paymentJson = JSON.stringify(payment);

    fs.writeFileSync(path, paymentJson, "utf-8");
    return res.status(202).json({ message: "payment updated successfull" });
  }

  if (req.method === "DELETE") {
  }
  res.status(401).send("unauthorized access");
};

export default handler;
