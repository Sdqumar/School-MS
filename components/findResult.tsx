import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BasicTable from "./BasicTable";
import Select from "./element/Select";
import ButtonSpinner from "./global/buttonSpinner";
import Error from "./utils/error";
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
  user?: student;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [names, setNames] = useState(null);


  if (error) {
    setTimeout(() => {
      setError(false)
    }, 1000);

  }
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
    studentID = studentID?.toString()?.replace(",", "");

    if (user) {
      studentID = user?.fullName?.split(" ").map((item) => item.charAt(0));
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
    setLoading(true)
    setError(false)

    const id = await getResultId(values);

    try {
      const res = await fetch("/api/result/" + values.year + "/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.errors) {
        console.log(data.errors);
        setLoading(false)
        setError(true)

      } else {
        setShowResultTable(data?.subject);
        setLoading(false)
        setError(false)
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
      setError(true)

    }
  };


  const year = [2021, 2022, 2023, 2024, 2025]

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
        <h4 className="text-3xl mb-4">Find Result</h4>
        {error &&
          <Error text="Error fetching result" />
        }
        <div className="flex align-middle w-56 children:mx-3">

          <Select
            data={year}
            register={register}
            name="year"
            label="Year"
            errors={errors}
          />

          <Select
            data={className}
            register={register}
            name="class"
            label="Class"
            errors={errors}
            onChange={handleChangeClass}
          />
          <Select
            data={term}
            register={register}
            name="term"
            label="Term"
            errors={errors}
          />

          {!user && names?.length > 0 && (
            <Select
              data={names.map(item => item.fullName)}
              register={register}
              name="studentName"
              label="Student Name"
              errors={errors}
            />
          )}

        </div>
        <ButtonSpinner loading={loading} label="Find Result" />

      </form>

      <div className="mt-7">
        {showResultTable && (
          <BasicTable TableData={showResultTable} COLUMNS={COLUMNS} />
        )}
      </div>
    </div>
  );
}
