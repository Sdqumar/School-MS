import React, { useState } from "react";
import { useForm } from "react-hook-form";
export type staff = {
    staffID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  level: string;
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
  } = useForm<staff>();


  const submitHandler = async (formValues: staff) => {
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
      <h2>Staff Sign Up</h2>
      <label> staff ID</label>

      <input
        {...register("staffID", { required: "Required" })}
        type="text"
      />
      {errors. staffID && <Errror message={errors. staffID.message} />}

      <label>Firstname</label>

      <input
        {...register("firstName", { required: "Required" })}
        type="text"
      />
      {errors.firstName && <Errror message={errors.firstName.message} />}

      <label>Lastname</label>

      <input
        {...register("lastName", { required: "Required" })}
        type="text"
      />
      {errors.lastName && <Errror message={errors.lastName.message} />}

      <label>Middlename</label>

      <input
        {...register("middleName", { required: "Required" })}
        type="text"
      />
      {errors.middleName && <Errror message={errors.middleName.message} />}

      <label>Age</label>

      <input {...register("age", { required: "Required" })} type="number" />
      {errors.age && <Errror message={errors.age.message} />}

      <label>Date of Birth</label>

      <input
        {...register("dateOfBirth", { required: "Required" })}
        type="date"
      />
      {errors.dateOfBirth && <Errror message={errors.dateOfBirth.message} />}

      <label>Level</label>

      <input {...register("level", { required: "Required" })} type="text" />
      {errors.level && <Errror message={errors.level.message} />}

      
      <label>State</label>

      <input {...register("state", { required: "Required" })} type="text" />
      {errors.state && <Errror message={errors.state.message} />}

      <label>LGA</label>

      <input {...register("LGA", { required: "Required" })} type="text" />
      {errors.LGA && <Errror message={errors.LGA.message} />}

      <label>Email</label>

      <input {...register("email",{ required: "Required" })} type="email" />
      {errors.email && <Errror message={errors.email.message} />}

      <label>password</label>

      <input {...register("password")} type="text"  />
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
