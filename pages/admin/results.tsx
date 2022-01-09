import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import BasicTable from "../../components/BasicTable";
import { getStudents } from "../api/student";
import classes from "../api/classes.json";
import COLUMNS from "../../components/utils/resultColums";
import FindResult from "../../components/findResult";
import Select from "../../components/element/Select";
import ResultForm from "../../components/admin/resultForm";
import ButtonSpinner from "../../components/global/buttonSpinner";
import Success from "../../components/utils/success";

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


  const [reviewResult, setReviewResult] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);
  const [createResult, setCreateResult] = useState(false);
  const [showResultTable, setShowResultTable] = useState(null);
  const [names, setNames] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (success) {
    setTimeout(() => {
      setSuccess(false)
      setReviewResult(false)
    }, 1000);
  }
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
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

  const submitCreateResult = async () => {
    setSubmitLoading(true)
    const id = await getResultId(values);

    const docName = year;

    const doc = { ...values, id, year };

    try {
      const res = await fetch("/api/result", {
        method: "POST",
        body: JSON.stringify({ doc, docName }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
        setSubmitLoading(false)
      } else {
        console.log(data);
        setSubmitLoading(false)
        setSuccess(true)
        reset()
      }
    } catch (err) {
      console.log(err);
      setSubmitLoading(false)

    }
  };


  useEffect(() => {
    const studentNames = res?.filter((item) => item.class === classes[0].name);
    const [{ subjects }] = classes?.filter(
      (item) => item.name === classes[0].name
    );
    setSubjects(subjects);
    setNames(studentNames);
  }, []);

  return (
    <section className="mx-5 mt-5 p-4">
      {!createResult && (
        <div>

          <div onClick={() => setCreateResult(true)}>
            <button className="text-xl ">
              Create a new Result
            </button>
          </div>
          <div className="mt-5">
            <FindResult data={res} />
          </div>

        </div>
      )}


      {createResult && (
        <form
          onSubmit={handleSubmit((formValues) =>
            handleResultReview()
          )}
        >
          <h4 className="text-3xl mb-4 font-medium">Create a new Result</h4>

          <div className="flex align-middle w-56 children:mx-3">

            <Select
              data={classes?.map(item => item.name)}
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
            <Select
              data={names?.map(item => item.fullName)}
              register={register}
              name="studentName"
              label="Student Name"
              errors={errors}
            />
              </div>
            {!showResultForm && (
              <button onClick={() => setShowResultForm(true)}>Contiune</button>
            )}


          {showResultForm &&
            <ResultForm
              values={values}
              setValue={setValue}
              subjects={subjects}
              register={register}
              errors={errors}
            />
          }

          {showResultForm && (
            <button>Review</button>

          )}
        </form>
      )}

      {success && <Success text="Student Result Added" />}
      {reviewResult && (
        <div>
          <BasicTable TableData={values.subject} COLUMNS={COLUMNS} />

          <ButtonSpinner loading={submitLoading} label="Create Result" onClick={submitCreateResult} className="text-xl mb-9" />
        </div>
      )
      }

      {showResultTable && (
        <BasicTable TableData={showResultTable} COLUMNS={COLUMNS} />
      )}
    </section>
  );
}

export async function getStaticProps() {
  let res = await getStudents();
  let data = JSON.stringify(res);

  return {
    props: { data }
  };
}

