import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../../components/global/buttonSpinner";
import Input from "../../components/global/input";


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
  const [loading, setLoading] = useState(false);

  const setFullName = () => {
    const { firstName, middleName, lastName } = getValues();
    setValue("fullName", `${firstName} ${middleName} ${lastName}`);
  };
  
  const submitHandler = async (formValues: staff) => {
    setLoading(true)

    try {
      const res = await fetch("/api/staff/signup", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
        setLoading(false)
      }
      if (data.user) {
        setLoading(false)
        console.log(data);
      }
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
        <h1 className="-mt-3">Staff Registration</h1>
        <h3 className="-mt-2">Register a New Staff</h3>

        <Input
          register={register}
          name="staffID"
          label="Staff ID"
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
          name="level"
          label="level"
          errors={errors}
        />
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
          errors={errors}
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
          name="password"
          label="Password"
          type="password"
          errors={errors} />

        <Input
          register={register}
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          errors={errors} />

        <Input
          register={register}
          name="fullName"
          label="Full Name"
          errors={errors}
          disabled={true}
        />
        <ButtonSpinner loading={loading} />

      </form>
    </div>

  );
}

