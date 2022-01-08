import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../../components/global/buttonSpinner";
import Input from "../../components/global/input";
export type student = {
  admissionNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  class: string;
  house: string;
  state: string;
  LGA: string;
  email: string;
  age: number;
  gender: string;
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


  const [loading, setLoading] = useState(false);

  const setPassword = () => {
    const { lastName } = getValues();
    setValue("password", lastName);
  };
  const setFullName = () => {

    const { firstName, middleName, lastName } = getValues();
    setValue("fullName", `${firstName} ${middleName} ${lastName}`);
  };
  
  const submitHandler = async (formValues: student) => {
    setLoading(true)
    console.log(formValues);

    try {
      const res = await fetch("/api/student/signup", {
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
    setLoading(false)

  };

  return (
    <div className="max-w-screen-md m-auto">
      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>

        <h1 className="-mt-3">Student Registration</h1>
        <h3 className="-mt-2">Register a New Student</h3>
        <Input
          register={register}
          name="admissionNo"
          label="Admission Number"
          errors={errors}
        />
        <Input
          register={register}
          name="firstName"
          label="First Name"
          errors={errors}
        />
        <Input
          register={register}
          name="lastName"
          label="Last Name"
          errors={errors}
          onBlur={setPassword}
        />
        <Input
          register={register}
          name="middleName"
          label="Middle Name"
          onBlur={setFullName}
          errors={errors}
        />
        <Input
          register={register}
          name="fullName"
          label="Full Name"
          errors={errors}
          disabled={true}
        />

        <Input
          register={register}
          name="age"
          label="Age"
          type="number"
          errors={errors}
        />

        <Input
          register={register}
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          errors={errors} />

        <Input
          register={register}
          name="class"
          label="Class"
          errors={errors} />
        <Input
          register={register}
          name="house"
          label="House"
          errors={errors} />
        <Input
          register={register}
          name="state"
          label="State"
          errors={errors} />
        <Input
          register={register}
          name="LGA"
          label="LGA"
          errors={errors}
        />
        <Input
          register={register}
          name="email"
          label="Email"
          type="email"
          errors={errors}
        />
        <Input
          register={register}
          name="password"
          label="Password"
          type="password"
          errors={errors}
          disabled={true}
           />

        <ButtonSpinner loading={loading} />
      </form>
    </div>
  );
}
