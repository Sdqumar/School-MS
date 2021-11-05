import Link from "next/link";
import { getStaffs } from "./api/staff";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import BasicTable from "../components/BasicTable";
import { useEffect } from "hoist-non-react-statics/node_modules/@types/react";

const className = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  'SS 1'
];

const subjects = [
  "English Language",
  " Mathematics",
  
];

const term = ["First Term", "Second Term"];

const studentName = [
  "Emmanuel Ayomide",
  "Idris zainab",
  "Muhammed Ummu",
  "lateef Abike",
  "Mubaraq Rahama",
  "David Williams",
  "Queen Isaac",
  "	Jessica Vincent",
];
export type subject = {
    name:string;
    firstCA: number;
    secondCA: number;
    examScore: number;
    totalScore: number;
    grade: string;
    remark: string;
}[]
export type result = {
  id:string;
  year:number;
  result: string;
  studentName: string;
  term: string;
  class: string;
  subject:subject
 
};
export default function Result({ data }) {
  //   const res = JSON.parse(data);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<result>();

  const [subjectIndex,setSubjectIndex]=useState(0)
const [resultComplete,setResultComplete]=useState(false)
const [reviewResult,setReviewResult]=useState(false)
const [showResultForm,setShowResultForm]=useState(false)
const values = getValues();

const handleResultReview=()=>{
reviewResult && setReviewResult(false)
!reviewResult && setReviewResult(true)
}
const submitHandler = async (formValues) => {
console.log('submit');

    try {

      const res = await fetch("/api/result", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      }else {
        // location.assign("/");
        console.log(data);

      }
    } catch (err) {
      console.log(err);
    }
  };
const year = new Date().getFullYear();

let id =''



const handleShowResultForm=()=>{
  let term ="01"
  if(values.term ===  'Second Term'){
    term='02'
  }
  console.log('sdsd');
  let studentID = values?.studentName?.split(" ").map(item=> item.charAt(0) )
  // studentID= studentID?.toString()?.replace(",", "");
  // // let [class1st,class2nd]= values.class.split(" ").map(item=>item.slice(0,3))
  // const classID= class1st +class2nd
  // console.log(classID);
  console.log(values);
  
setShowResultForm(true)
}

const setTotalScore=()=>{
    const values = getValues();
    const firstCA =values.subject?.[subjectIndex].firstCA
    const secondCA =values.subject?.[subjectIndex].secondCA
    const examScore =values.subject?.[subjectIndex].examScore
    
    if(firstCA && secondCA && examScore){

    //@ts-expect-error
    const totalScore = parseInt(firstCA) + parseInt(secondCA)  +parseInt(examScore)

     setValue(`subject.${subjectIndex}.totalScore`
     , totalScore);

     let grade =''
     let remark= ''
     if(totalScore >=29 && totalScore <= 0  ){
        grade = 'F'
        remark='Very Poor' 
    }
    if(totalScore >=30  && totalScore <= 39){
        grade = 'E'
        remark='Poor'
     }
    if(totalScore >=40 && totalScore <= 49){
        grade = 'D'
        remark='Fair'
     }
     if(totalScore >=50 && totalScore <= 59){
        grade = 'C'
        remark='Good'
     }

     if(totalScore >=60 && totalScore <= 69){
        grade = 'B'
        remark='Very Good'
     }
   
  
      if(totalScore >=70 && totalScore <= 100){
        grade = 'A'
        remark='Excellet'
     }
    
     setValue(`subject.${subjectIndex}.grade`
     , grade);
     setValue(`subject.${subjectIndex}.remark`
     , remark);
    
  
    }
    
}
  return (
    <section>
      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
        <h4>Create a new Result</h4>
        <input
                {...register(`id`, {
                    required: "Required",
                })}
                type="text"
                defaultValue={id}
                hidden
                />
        <input
                {...register(`year`, {
                    required: "Required",
                })}
                type="text"
                defaultValue={year}
                hidden
                />
        <label>Class</label>
        <select
          {...register("class", {
            required: "Required",
          })}
        >
          {className.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.class && <Errror message={errors.class.message} />}

        <label>Term</label>
        <select
          {...register("term", {
            required: "Required",
          })}
        >
          {term.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.term && <Errror message={errors.term.message} />}

        <label>Student Name</label>
        <select
          {...register("studentName", {
            required: "Required",
          })}
        >
          {studentName.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.studentName && <Errror message={errors.studentName.message} />}
{!showResultForm && <button onClick={handleShowResultForm}>Contiune</button>}
         {showResultForm && subjects.map((item,index) => (
               <div className="result" key={item} onClick={()=>setSubjectIndex(index)}>
            <label>{item}</label>
            <div>

              <input
                {...register(`subject.${index}.name`, {
                    required: "Required",
                })}
                type="text"
                defaultValue={item}
                hidden
                />
                <label>1st CA</label>
              <input
                {...register(`subject.${index}.firstCA`, {
                  required: "Required", 
                })}
                min="0" max="20"
                type="number"
                onBlur={setTotalScore}
              />
            </div>
            <div>
              <label>2st CA</label>

              <input
                {...register(`subject.${index}.secondCA`, {
                  required: "Required",
                })}
                type="number"
                min="0" max="20"
                onBlur={setTotalScore}
              />
            </div>
        
            <div>
              <label>Exam </label>

              <input
                {...register(`subject.${index}.examScore`, {
                  required: "Required",
                })}
                type="number"
                min="0" max="60"

                onBlur={setTotalScore}
              />
            </div>
            <div>
              <label>Total</label>

              <input
                {...register(`subject.${index}.totalScore`, {
                  required: "Required",
                })}
                type="number"
                min="0" max="100"
              />
            </div>
            <div>
              <label>Grade</label>

              <input
                {...register(`subject.${index}.grade`, {
                  required: "Required",
                })}
                type="text"
              />
            </div>
            <div>
              <label>Remark</label>

              <input
                {...register(`subject.${index}.remark`, {
                  required: "Required",
                })}
                type="text"
              />

              {errors.studentName && (
                <Errror message={errors.studentName.message} />
              )}
            </div>
          </div>
        ))} 

{showResultForm &&  
      <>
      <button>submit</button>
        <button onClick={handleResultReview}>Review</button>
        </>}
      </form>
{reviewResult&&
      <BasicTable result={values.subject}/>
}    </section>
  );
}

// export async function getStaticProps() {
// //   let res = await getStaffs();
// //   let data = await JSON.stringify(res);

// //   return {
// //     props: { data },
// //   };
// }

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
