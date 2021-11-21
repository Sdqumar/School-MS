import Link from "next/link";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import BasicTable from "../../components/BasicTable";
import { getStudents } from "../api/student";
import classes from "../api/classes.json";
import COLUMNS from "../../components/utils/resultColums";
import FindResult from "../../components/findResult";



const term = ["First Term", "Second Term", "Third Term"];

export type subject = {
  name: string;
  firstCA: number;
  secondCA: number;
  examScore: number;
  totalScore: number;
  grade: string;
  remark: string;
}[];
export type result = {
  id: string;
  year: number;
  result: string;
  studentName: string;
  term: string;
  class: string;
  subject: subject;
};
export default function Result({ data }) {
  let res = JSON.parse(data);

  const [names, setNames] = useState(null);
  const [subjects, setSubjects] = useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<result>();
  const values = getValues();

  const handleChangeClass = (e) => {
    const currentClass = e.target.value;

    const studentNames = res?.filter((item) => item.class === currentClass);
    const [{ subjects }] = classes?.filter(
      (item) => item.name === currentClass
    );

    setSubjects(subjects);
    setNames(studentNames);
  };

  const [subjectIndex, setSubjectIndex] = useState(0);
  const [resultComplete, setResultComplete] = useState(false);
  const [reviewResult, setReviewResult] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);

  const handleResultReview = () => {
    reviewResult && setReviewResult(false);
    !reviewResult && setReviewResult(true);
  };

  const year = new Date().getFullYear().toString();

  const getResultId = async (formValues) => {
    let term = "01";

    if (formValues.term === "Second Term") {
      term = "02";
    }
    if (formValues.term === "Third Term") {
      term = "03";
    }
    let studentID: string[] | string = formValues.studentName
      ?.split(" ")
      .map((item) => item.charAt(0));
    studentID = studentID.toString()?.replace(",", "");
    let [class1st, class2nd] = formValues.class
      .toUpperCase()
      .split(" ")
      .map((item) => item.slice(0, 3));
    const classID = class1st + class2nd;
    const id = `${year}-${term}-${classID}-${studentID}`;
    return id;
  };

  

  const setTotalScore = () => {
    const firstCA = values.subject?.[subjectIndex].firstCA.toString();
    const secondCA = values.subject?.[subjectIndex].secondCA.toString();
    const examScore = values.subject?.[subjectIndex].examScore.toString();

    if (firstCA && secondCA && examScore) {
      const totalScore =
        parseInt(firstCA) + parseInt(secondCA) + parseInt(examScore);

      setValue(`subject.${subjectIndex}.totalScore`, totalScore);

      let grade = "";
      let remark = "";

      if (totalScore >= 0 && totalScore <= 29) {
        console.log(totalScore >= 0 && totalScore <= 29);
        grade = "F";
        remark = "Very Poor";
      }
      if (totalScore >= 30 && totalScore <= 39) {
        grade = "E";
        remark = "Poor";
      }
      if (totalScore >= 40 && totalScore <= 49) {
        grade = "D";
        remark = "Fair";
      }
      if (totalScore >= 50 && totalScore <= 59) {
        grade = "C";
        remark = "Good";
      }

      if (totalScore >= 60 && totalScore <= 69) {
        grade = "B";
        remark = "Very Good";
      }

      if (totalScore >= 70 && totalScore <= 100) {
        grade = "A";
        remark = "Excellent";
      }

      setValue(`subject.${subjectIndex}.grade`, grade);
      setValue(`subject.${subjectIndex}.remark`, remark);
    }
  };

  const submitCreateHandler = async (formValues) => {
    const id = await getResultId(formValues);

    const docName = year;
    console.log(docName);

    const doc = { ...formValues, id, year };

    try {
      const res = await fetch("/api/result", {
        method: "POST",
        body: JSON.stringify({ doc, docName }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      } else {
        // location.assign("/");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  const [createResult, setCreateResult] = useState(false);
  const [showResultTable, setShowResultTable] = useState(null);
  useEffect(() => {
    const studentNames = res?.filter((item) => item.class === classes[0].name);
    const [{ subjects }] = classes?.filter(
      (item) => item.name === classes[0].name
    );
    setSubjects(subjects);
    setNames(studentNames);
  }, []);

  return (
    <section>
      {!createResult && (
        <div onClick={() => setCreateResult(true)}>
          <Link href="#">Create a new Result</Link>
        </div>
      )}
      {createResult && (
        <form
          onSubmit={handleSubmit((formValues) =>
            submitCreateHandler(formValues)
          )}
        >
          <h4>Create a new Result</h4>

          <label>Class</label>
          <select
            {...register("class", {
              required: "Required",
            })}
            onChange={(e) => handleChangeClass(e)}
          >
            {classes.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
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
            {names?.map((item) => (
              <option value={item.fullName} key={item.admissionNo}>
                {item.fullName}
              </option>
            ))}
          </select>
          {errors.studentName && (
            <Errror message={errors.studentName.message} />
          )}
          {!showResultForm && (
            <button onClick={() => setShowResultForm(true)}>Contiune</button>
          )}
          {showResultForm &&
            subjects.map((item, index) => (
              <div
                className="result"
                key={item}
                onClick={() => setSubjectIndex(index)}
              >
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
                    min="0"
                    max="20"
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
                    min="0"
                    max="20"
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
                    min="0"
                    max="60"
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
                    min="0"
                    max="100"
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

          {showResultForm && (
            <>
              <button type="submit">submit</button>
            </>
          )}
        </form>
      )}
      {showResultForm && <button onClick={handleResultReview}>Review</button>}
      {reviewResult && (
        <BasicTable TableData={values.subject} COLUMNS={COLUMNS} />
      )}{" "}
      {!createResult && (
       
       <FindResult names={names}/>
      )}{" "}
      {showResultTable && (
        <BasicTable TableData={showResultTable} COLUMNS={COLUMNS} />
      )}
    </section>
  );
}

export async function getStaticProps() {
  let res = await getStudents();
  let data = await JSON.stringify(res);

  return {
    props: { data },
  };
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
