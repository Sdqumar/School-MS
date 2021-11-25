import Link from "next/link";
import { useForm } from "react-hook-form";
import subjects from "../api/subjects.json";
import classes from "../api/classes.json";
import { useState } from "react";
import RowSelection from "../../components/RowSelection";
type classes = {
  name: string;
  subjects: [""];
};

const COLUMNS = [
  {
    Header: "Class",
    accessor: "name",
  },
  {
    Header: "Subjects",
    accessor: (originalRow) =>
      originalRow.subjects.map((item) => <span key={item}>{item}, </span>),
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
    <section>
      <div className="ml-4">
      <h1>Classes</h1>
      <div className="link" onClick={() => setShowAdd(true)}>Add Class</div>
      </div>

      {showAdd && (
        <div className="flex w-full">
         

          <form
            onSubmit={handleSubmit((formValues) => submitHandler(formValues))}
         className="flex-grow"
         >
            <div className="w-48">

            <h4>Add Class</h4>
            <input
              {...register("name", {
                required: "Required",
              })}
              type="text"
              />
            {errors.name && <Errror message={errors.name.message} />}

              </div>
            <h3 className="mt-8 font-medium text-xl">Subjects</h3>
            <div className="flex flex-col   ">
              {subjects.map((item) => (
                <span
                  key={item}
                 className="flex   items-center "
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
            <button>submit</button>
            <span style={{ cursor: "pointer" }} onClick={handleDelete}>
              Delete subject
            </span>
          </form>
          <AddSubject />

        </div>
      )}
      <RowSelection TableData={classes} COLUMNS={COLUMNS} />
    </section>
  );
}



export const AddSubject = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async (formValues) => {
    console.log(formValues.subject);
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
        // location.assign("/");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit((formValues) => submitHandler(formValues))}
className="h-48"
    >
      <h4>Add Subject</h4>

      <input
        {...register("subject", {
          required: "Required",
        })}
        type="text"
      />
      {errors.subject && <Errror message={errors.subject.message} />}
      <button>submit</button>
    </form>
  );
};

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
