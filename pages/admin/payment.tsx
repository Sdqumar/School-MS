import classes from "../api/classes.json";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import BasicTable from "../../components/BasicTable";

const term = ["First Term", "Second Term", "Third Term"];

const COLUMNS = [
  {
    Header: "Class",
    accessor: "name",
  },

  {
    Header: "Amount",
    accessor: (row) => `₦ ${Number(row.amount).toLocaleString()}`,
  },
  {
    Header: "Charges",
    accessor: (row) => `₦ ${Number(row.charges).toLocaleString()}`,
  },
  {
    Header: "Total",
    accessor: (row) => `₦ ${Number(row.total).toLocaleString()}`,
    
  },
];

type payment = {
  year: number;
  term: string;
  charges: number;
  class: {
    name: string;
    total: number;
    amount: number;
    charges: number;
  }[];
};

export default function Payment() {
  const [preview, setPreview] = useState(null);

  const handleForm = async (values:payment) => {
    values.class.forEach((item, index) => {
      setValue(
        `class.${index}.total`,
        Number(item.amount) + Number(values.charges)
      );
      setValue(`class.${index}.charges`, Number(values.charges));
    });


    setPreview(null);
    setPreview(values.class);

    
  };
const handleSave=async()=>{
try {
        const res = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(values),
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
}
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<payment>();
  const values = getValues();

  return (
    <div className="m-5">
      <h1>Payment</h1>

      <form onSubmit={handleSubmit((formValues) => handleForm(formValues))}>
        <h4 className="text-3xl mb-4">
          Set Payment for current Academic Seassion
        </h4>

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

        {classes.map((item, index) => {
          setValue(`class.${index}.name`, item.name);
          return (
            <div className="flex items-center" key={item.name}>
              <label className="mt-5">{item.name}</label>
              <input
                {...register(`class.${index}.amount`, {
                  required: "Required",
                })}
                type="number"
                className="w-60 ml-5 h-10"
              />
            </div>
          );
        })}
        <div className="flex items-center">
          <label className="mt-5">Processing Fees</label>
          <input
            {...register("charges", {
              required: "Required",
            })}
            type="number"
            className="w-60 ml-5 h-10"
          />
        </div>

        <button>preview</button>
      </form>

      {preview && <BasicTable TableData={preview} COLUMNS={COLUMNS} />}
          <button className="mb-10" onClick={handleSave}>save</button>
    </div>
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
