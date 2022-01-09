import classes from "../api/classes.json";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import BasicTable from "../../components/BasicTable";
import Select from "../../components/element/Select";
import Input from "../../components/element/input";

const term = ["First Term", "Second Term", "Third Term"];
const year = [2021, 2022, 2023, 2024, 2025]

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

  const handleForm = async (values: payment) => {
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
  const handleSave = async () => {
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

        <Select
          data={year}
          register={register}
          name="year"
          label="Year"
          errors={errors}
        />

        <Select
          data={term}
          register={register}
          name="term"
          label="Term"
          errors={errors}
        />

        {classes.map((item, index) => {
          setValue(`class.${index}.name`, item.name);
          return (
            <div className="flex items-center mt-5" key={item.name}>
              <Input
                register={register}
                name={`class.${index}.amount`}
                label={item.name}
                errors={errors}
                type="number"
                containerStyle="flex children:mr-2.5"
              />

            </div>
          );
        })}
        <Input
          register={register}
          name='charges'
          label={"Processing Fees"}
          errors={errors}
          type="number"
          containerStyle="flex children:mr-2.5 mt-5"
        />


        <button>preview</button>
      </form>

      {preview && <BasicTable TableData={preview} COLUMNS={COLUMNS} />}
      <button className="mb-10" onClick={handleSave}>save</button>
    </div>
  );
}

