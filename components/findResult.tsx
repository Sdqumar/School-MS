import { useEffect, useState } from "react";
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
  fullName: string;
  class: string;
};

type FindResult = {
  user?: string;
  data?: student[];
};

export default function FindResult({ user, data }: FindResult) {
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
    let studentID: string[] | string = values?.studentName
      ?.split(" ")
      .map((item) => item.charAt(0));
    studentID = studentID.toString()?.replace(",", "");

    if (user) {
      studentID = user?.split(" ").map((item) => item.charAt(0));
      studentID = studentID.toString()?.replace(",", "");
    }

    let [class1st, class2nd] = values.class
      .toUpperCase()
      .split(" ")
      .map((item) => item.slice(0, 3));
    const classID = class1st + class2nd;
    const id = `${values.year}-${term}-${classID}-${studentID}`;

    return id;
  };

  const handleForm = async (values) => {
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
  };

  const [names, setNames] = useState(null);

  const handleChangeClass = (e) => {
    const currentClass = e.target.value;

    const studentNames = data?.filter((item) => item.class === currentClass);
    setNames(studentNames);
  };
  useEffect(() => {
    const studentNames = data?.filter((item) => item.class === className[0]);
    setNames(studentNames);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit((formValues) => handleForm(formValues))}>
        <h4 className="text-3xl mb-4">Find Result</h4>

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
