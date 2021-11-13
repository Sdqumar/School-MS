import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = process.cwd() + "/pages/api/subjects.json";
  const { subject } = req.body;
  let subjectsJson = fs.readFileSync(path, "utf-8");

  let subjects = JSON.parse(subjectsJson);
  if (req.method === "POST") {

  const isSubject = subjects.find((i) => i === subject);
  if (!isSubject) {
    subjects.push(subject);
    subjectsJson = JSON.stringify(subjects);
    fs.writeFileSync(path, subjectsJson, "utf-8");
    return res.status(202).json({ message: "subject added successfull" });
  } else {
    res.status(400).json({ message: "subject already existed" });
  }
}

if (req.method === "DELETE") {

  const  data = req.body;
  // console.log(data);
  
  const [newSubjects] = 
  data.map(i=>subjects.filter((item) => {
     return(
        item !== i
      );
    })
  )
  
  console.log(newSubjects);
  
    subjectsJson = JSON.stringify(newSubjects);
    fs.writeFileSync(path, subjectsJson, "utf-8");
    return res.status(202).json({ message: "subject deleted successfull" });

}
  res.status(401).send("unauthorized access");
};

export default handler;
