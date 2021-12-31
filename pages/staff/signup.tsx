import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Errror from "../../components/global/Error";

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
  fullName: string;

};

export default function App() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<staff>();

  const setFullName = () => {
    const { firstName, middleName, lastName } = getValues();
    setValue("fullName", `${firstName} ${middleName} ${lastName}`);
  };
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
    <div className="max-w-screen-md m-auto">

    <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h1 className="-mt-3">Staff Registration</h1>
      
      <label> Staff ID</label>
      <input
        {...register("staffID", { required: "Required" })}
        type="text"
      />
      {errors.staffID && <Errror message={errors.staffID.message} />}

      <label>First Name</label>

      <input
        {...register("firstName", { required: "Required" })}
        type="text"
      />
      {errors.firstName && <Errror message={errors.firstName.message} />}

      <label>Last Name</label>

      <input
        {...register("lastName", { required: "Required" })}
        type="text"
      />
      {errors.lastName && <Errror message={errors.lastName.message} />}

      <label>Middle Name</label>

      <input
        {...register("middleName", { required: "Required" })}
        type="text"
        onBlur={setFullName}

      />
      {errors.middleName && <Errror message={errors.middleName.message} />}
      <label>Full Name</label>

      <input
        {...register("fullName", { required: "Required" })}
        type="text"
        disabled
      />
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

      <input {...register("email", { required: "Required" })} type="email" />
      {errors.email && <Errror message={errors.email.message} />}

      <label>Password</label>

      <input {...register("password")} type="text" />
      {errors.state && <Errror message={errors.password.message} />}
      <button>Submit</button>
    </form>
    </div>

  );
}

