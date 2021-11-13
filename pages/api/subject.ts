import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
const path= process.cwd() + "/pages/api/subjects.json"
    const {subject}=req.body
    let subjectsJson= fs.readFileSync(path,"utf-8");
    console.log(subjectsJson);
    
    let subjects = JSON.parse(subjectsJson);
   const isSubject =subjects.find(i=> i=== subject)
   if(!isSubject){
    subjects.push(subject);
    subjectsJson = JSON.stringify(subjects);
    fs.writeFileSync(path,subjectsJson,"utf-8");
    return res.status(202).json({ message: "subject added successfull" });
   }else{

       res.status(400).json({ message: "subject already existed" })
   }
   res.status(401).send("unauthorized access");

};

export default handler;
