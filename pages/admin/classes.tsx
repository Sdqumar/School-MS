import Link from "next/link";
import { useForm } from "react-hook-form";
import subjects from "../api/subjects.json";
import classes from "../api/classes.json";
import { useState } from "react";
import RowSelection from "../../components/RowSelection";
import Input from "../../components/global/input";
type classes = {
  name: string;
  subjects: [""];
};

const COLUMNS = [
  {
    Header: "Class",
    accessor: row=><div className="w-20">{row.name}</div>,
  },
  {
    Header: "Subjects",
    accessor: (row) =>row?.subjects?.map((item) => <span key={item}>{item}, </span>)
  },
];

export default function Classes({ data }) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<classes>();

  const handleDelete = async () => {
    const values = getValues();

    const { subjects } = values;
    try {
      const res = await fetch("/api/subject", {
        method: "DELETE",
        body: JSON.stringify(subjects),
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
  const submitHandler = async (formValues) => {
    console.log(formValues);
    try {
      const res = await fetch("/api/class", {
        method: "POST",
        body: JSON.stringify(formValues),
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

  const [showAdd, setShowAdd] = useState(false);
  return (
    <main className="mx-10">
      <h1>Classes</h1>
      <button className="link" onClick={() => setShowAdd(true)}>Add Class</button>

      {showAdd && (
        <div className="flex w-full ">

          <form
            onSubmit={handleSubmit((formValues) => submitHandler(formValues))}
         className="flex-grow"
         >
            <div className="w-48">

            <Input
          register={register}
          name="name"
          label="Add Class"
          errors={errors}
        />
            
              </div>
            <h3 className="mt-8 font-medium text-xl">Subjects</h3>
            <div className="flex flex-col   ">
              {subjects.map((item) => (
                <span
                  key={item}
                 className="flex items-center "
                >
                  <input
                  className="w-auto mr-9"
                    type="checkbox"
                    value={item}
                    {...register("subjects")}
                  />

                  <strong className=" whitespace-nowrap">{item}</strong>
                </span>
              ))}
            </div>
            <button>Add Class</button>
            <div className="font-semibold text-sm mt-2 max-w-max cursor-pointer py-2 px-4 text-white bg-primary tracking-widest " onClick={handleDelete}>
              Delete subject
            </div>
          </form>
          <AddSubject />

        </div>
      )}
      <RowSelection TableData={classes} COLUMNS={COLUMNS} />
    </main>
  );
}



export const AddSubject = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async (formValues) => {
    try {
      const res = await fetch("/api/subject", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit((formValues) => submitHandler(formValues))}
className="max-h-60"
    >
      <h4>Add Subject</h4>
      <Input
          register={register}
          name="subject"
          label="Add Subject"
          errors={errors}
        />
      
      <button>Add Subject</button>
    </form>
  );
};
