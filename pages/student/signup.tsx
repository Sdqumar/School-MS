import React, { useState } from "react";
import { useForm } from "react-hook-form";
export type student = {
  admissionNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName:string;
  class: string;
  house: string;
  state: string;
  LGA: string;
  email: string;
  age: number;
  dateOfBirth: string;
  password: string;
};

export default function App() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<student>();

  const setPassword = () => {
    const { lastName } = getValues();
    setValue("password", lastName);
  };
  const setFullName = () => {
    const { firstName,middleName,lastName } = getValues();
    setValue("fullName", `${firstName} ${middleName} ${lastName}`);
  };
  const submitHandler = async (formValues: student) => {
    console.log(formValues);

    try {
      const res = await fetch("/api/staff/signup", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      }
      if (data.user) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h2>Student Sign Up</h2>
      <label>Admission Number</label>

      <input
        {...register("admissionNo", { required: "Required" })}
        type="text"
      />
      {errors.admissionNo && <Errror message={errors.admissionNo.message} />}

      <label>Firstname</label>

      <input
        {...register("firstName", { required: "Required" })}
        type="text"
        onBlur={setPassword}
      />
      {errors.firstName && <Errror message={errors.firstName.message} />}

      <label>Lastname</label>

      <input
        {...register("lastName", { required: "Required" })}
        type="text"
        onBlur={setPassword}
      />
      {errors.lastName && <Errror message={errors.lastName.message} />}

      <label>Middlename</label>

      <input
        {...register("middleName", { required: "Required" })}
        type="text"
        onBlur={setFullName}
      />
      {errors.middleName && <Errror message={errors.middleName.message} />}
      <label>Fullname</label>

<input
  {...register("fullName", { required: "Required" })}
  type="text"
  disabled
/>
{errors.fullName && <Errror message={errors.fullName.message} />}

      <label>Age</label>

      <input {...register("age", { required: "Required" })} type="number" />
      {errors.age && <Errror message={errors.age.message} />}

      <label>Date of Birth</label>

      <input
        {...register("dateOfBirth", { required: "Required" })}
        type="date"
      />
      {errors.dateOfBirth && <Errror message={errors.dateOfBirth.message} />}

      <label>Class</label>

      <input {...register("class", { required: "Required" })} type="text" />
      {errors.class && <Errror message={errors.class.message} />}

      <label>House</label>

      <input {...register("house", { required: "Required" })} type="text" />
      {errors.house && <Errror message={errors.house.message} />}

      <label>State</label>

      <input {...register("state", { required: "Required" })} type="text" />
      {errors.state && <Errror message={errors.state.message} />}

      <label>LGA</label>

      <input {...register("LGA", { required: "Required" })} type="text" />
      {errors.LGA && <Errror message={errors.LGA.message} />}

      <label>Email</label>

      <input {...register("email")} type="email" />
      {errors.email && <Errror message={errors.email.message} />}

      <label>password</label>

      <input {...register("password")} type="text" disabled={true} />
      {errors.state && <Errror message={errors.password.message} />}
      <button>submit</button>
    </form>
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
