import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BasicTable from "./BasicTable";
import getResultId from "./utils/getStudntId";
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
  fullName: string;
  class: string;
  _id:number
};

type FindResult = {
  user?: student;
  data?: student[];
};

export default function FindRecipt({ user, data }: FindResult) {
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
  
  
  console.log(user);
  const handleForm = async (values) => {
        
    try {
      const res = await fetch("/api/student/recipt", {
        method: "POST",
        body: JSON.stringify({studentId:user._id}),
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
  };

  const [names, setNames] = useState(null);

  const defaultClass = () => {};

  const handleChangeClass = (e) => {
    if (!user) {
      const currentClass = e.target.value;

      const studentNames = data?.filter((item) => item.class === currentClass);
      setNames(studentNames);
    }
  };
  useEffect(() => {
    const studentNames = data?.filter((item) => item.class === className[0]);
    setNames(studentNames);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit((formValues) => handleForm(formValues))}>
        <h4 className="text-3xl mb-4">Find Recipt</h4>

        <label>Year</label>
        <select
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

        <label>Class</label>
        <select
          {...register("class", {
            required: "Required",
          })}
          defaultValue={user?.class}
          onChange={handleChangeClass}
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

        {!user && (
          <>
            <label>Student Name</label>
            <select
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
        )}
        <button>Find Result</button>
      </form>

      <div className="mt-7">
        {showResultTable && (
          <BasicTable TableData={showResultTable} COLUMNS={COLUMNS} />
        )}
      </div>
    </div>
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
