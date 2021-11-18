import React from "react";
import {  useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';

type student = {
  password: string;
  admissionNo: string;
};

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
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
      }else {
        // location.assign("/");
        console.log({message:'Logging successfully'},data);
        setCookie('user', data,{path :'/'} );
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h2>Portal Sign In </h2>

      <label>Admission No</label>

      <input
        {...register("admissionNo", {
          required: "Required"
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
  );
}

type errorProps = {
  message?: string | undefined;
};
export function Errror({ message }: errorProps) {
  return <p>{message}</p>;
}
