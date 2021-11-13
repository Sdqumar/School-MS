import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = process.cwd() + "/pages/api/classes.json";
const className= req.body
  let classesJson = fs.readFileSync(path, "utf-8");

  let classes = JSON.parse(classesJson);
  if (req.method === "POST") {
    const isClass = classes.find((i) => i.name === className.name);
    if (!isClass) {
      classes.push(className);
      
      classesJson = JSON.stringify(classes);
      fs.writeFileSync(path, classesJson, "utf-8");
      return res.status(202).json({ message: "class added successfull" });
    } else {
      res.status(400).json({ message: "class already existed" });
    }
  }

  if (req.method === "DELETE") {
    const data = req.body;

    const [newClasses] = data.map((i) =>
      classes.filter((item) => {
        return item.name !== i.name;
      })
    );


    classesJson = JSON.stringify(newClasses);
    fs.writeFileSync(path, classesJson, "utf-8");
    return res.status(202).json({ message: "class deleted successfull" });
  }
  res.status(401).send("unauthorized access");
};

export default handler;
