import { useState,  } from "react";
import { useForm } from "react-hook-form";
import BasicTable from "./BasicTable";
import COLUMNS from "./utils/resultColums";

export type result = {
    id: string;
    year: number;
    result: string;
    term: string;
    class: string;
    studentName: string;
  };
   type student = {
    admissionNo: string;
    fullName:string;
  };

  type FindResult ={
      user?:string
      names?:student[]
  }

export default function FindResult({user,names}:FindResult){
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm<result>();
    
      const term = ["First Term", "Second Term", "Third Term"];
      const className = [
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
        "SS 1",
      ];
      const [showResultTable, setShowResultTable] = useState(null);
    
      const getResultId = async (values) => {
        let term = "01";
    
        if (values.term === "Second Term") {
          term = "02";
        }
        if (values.term === "Third Term") {
          term = "03";
        }
        let studentID: string[] | string = user || values.studentName
          ?.split(" ")
          .map((item) => item.charAt(0));
        studentID = studentID.toString()?.replace(",", "");
        let [class1st, class2nd] = values.class
          .toUpperCase()
          .split(" ")
          .map((item) => item.slice(0, 3));
        const classID = class1st + class2nd;
        const id = `${values.year}-${term}-${classID}-${studentID}`;
        
        return id;
      };
    
    const handleForm= async(values)=>{
    
    
      const id = await getResultId(values);
    
        try {
          const res = await fetch("/api/result/" + values.year + "/" + id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          
          if (data.errors) {
            console.log(data.errors);
          } else {
            setShowResultTable(data?.subject);
          }
        } catch (err) {
          console.log(err);
        }
    }
    
    return(
        <div>
        <form onSubmit={handleSubmit((formValues) => handleForm(formValues))}>
        <h4 className="text-3xl mb-4">Find Result</h4>
  
        <label className="text-2xl mx-3">Year</label>
        <select
          className="border-2 ml-3 w-24"
          {...register("year", {
            required: "Required",
          })}
        >
          {[2021, 2022, 2023, 2024, 2025].map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.year && <Errror message={errors.year.message} />}
  
        <label className="text-2xl mx-3">Class</label>
        <select
         className="border-2 ml-3 w-24"
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
  
        <label className="text-2xl mx-3">Term</label>
        <select
         className="border-2  w-24"
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
  <br/>

  {
      !user && 
      <>
      <label  className="text-2xl mx-3">Student Name</label>
      <select
       className="border-2  w-24"
        {...register("studentName", {
          required: "Required",
        })}
      >
        {names?.map((item) => (
          <option value={item.fullName} key={item.admissionNo}>
            {item.fullName}
          </option>
        ))}
      </select>
      {errors.studentName && (
        <Errror message={errors.studentName.message} />
      )}
      </>
  }
        <button  className="bg-blue-400 hover:bg-blue-200 mt-3 ml-4 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page" > Find Result</button>
      </form>
  
      <div className="mt-7">
      {showResultTable && (
          <BasicTable TableData={showResultTable} COLUMNS={COLUMNS} />
        )}
      </div>
      </div>
    )
}

type errorProps = {
    message?: string | undefined;
  };
  export function Errror({ message }: errorProps) {
    return <p>{message}</p>;
  }
  