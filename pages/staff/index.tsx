import Link from "next/link";
import { useState, useEffect } from "react";
import useStore from "../../components/useStore";
import Image from "next/image";
import SideNavBar from "../../components/StudentSideBar";
import { useForm } from "react-hook-form";
import Select from "../../components/utils/Select";
import BasicTable from "../../components/BasicTable";

import COLUMNS from "../../components/utils/resultColums";

export type result = {
  id: string;
  year: number;
  result: string;
  term: string;
  class: string;
};
export default function StudentDashboard() {
  const user = useStore((state) => state.user);
  const navData = ["Profile", "Print result", "Print recipt", "Payment"];

  const userProfile = [
    { name: "Admission-No", value: user?.admissionNo },
    { name: "Full-Name", value: user?.fullName },
    { name: "Class", value: user?.class },
    { name: "House", value: user?.house },
    { name: "Age", value: user?.age },
  ];

  return (
    <div className="flex h-screen">
      <SideNavBar navData={navData} />

      <main>
        <section className=" align-center border-2 border-blue-300 border-solid flex mt-14 h-44">
          <div className="flex flex-col">
            {userProfile.map((item) => (
              <div
                className="flex children:w-40 h-screen 
            border-solid  border-b-2 font-medium"
              >
                <span className="text-center bg-blue-200   last:border-0">
                  {item.name}
                </span>
                <span className="ml-3">{item.value}</span>
              </div>
            ))}
          </div>
          <Image
            src="/avatar.jpg"
            alt="Picture of the author"
            width={180}
            height={30}
          />
        </section>
        <section className="mt-14">{<Form user={user?.fullName} />}</section>
      </main>
    </div>
  );
}

export function Form({ user }) {
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
    let studentID: string[] | string = user
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

  return (
    <>
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
        <br />
        <button
          className="bg-blue-400 hover:bg-blue-200 mt-3 ml-4 text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-current="page"
        >
          {" "}
          Find Result
        </button>
      </form>

      <div className="mt-7">
        {showResultTable && (
          <BasicTable TableData={showResultTable} COLUMNS={COLUMNS} />
        )}
      </div>
    </>
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
