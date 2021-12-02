import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Success from "../../components/utils/success";
import Error from "../../components/utils/Error";
import Head from "next/head";
type student = {
  password: string;
  admissionNo: string;
};

export default function App() {
  const [, setCookie] = useCookies(["user"]);
  const [success, setSucess] = useState("hidden");
  const [error, setError] = useState("hidden");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<student>();
  const submitHandler = async (formValues) => {
    try {
      const res = await fetch("/api/student/login", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
        setError("block");
      } else {
        console.log({ message: "Logging successfully" });
        setCookie("user", data, { path: "/" });
        setSucess("block");
        setTimeout(() => {
          location.assign("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setError("block");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((formValues) => submitHandler(formValues))}
        className="w-96"
      >
        <h2>Portal Sign In </h2>
        <Success className={`mt-5 ${success}`} text="Login successfully" />
        <Error
          className={`mt-5 ${error}`}
          text="Invalid Admission No or Password"
        />

        <label>Admission No</label>

        <input
          {...register("admissionNo", {
            required: "Required",
          })}
          type="text"
        />
        {errors.admissionNo && <Errror message={errors.admissionNo.message} />}

        <label>Password</label>

        <input
          {...register("password", { required: "Required" })}
          type="password"
        />
        {errors.password && <Errror message={errors.password.message} />}

        <button>submit</button>
      </form>
    </>
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
