import classes from "../api/classes.json";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";

const term = ["First Term", "Second Term", "Third Term"];

type payment = {
  year: number;
  term: string;
  class: { name:string;
    amount: number }[];
};

export default function Payment() {
  const handleForm = async(values) => {

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
  };

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
         setValue(`class.${index}.name`, item.name)
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
        <button>save</button>
      </form>
    </div>
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
