import React from "react";
import {  useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';

type staff = {
  password: string;
  staffID: string;
};

export default function App() {
  const [cookies, setCookie] = useCookies(['user']);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<staff>();
  const submitHandler = async (formValues) => {

    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      }else {
        // location.assign("/");
        console.log({message:'Logging successfully'});
        
        setCookie('user', data,{path:'/'} );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h2>Staff Sign In Portal</h2>

      <label>Staff ID</label>

      <input
        {...register("staffID", {
          required: "Required"
        })}
        type="text"
      />
      {errors.staffID && <Errror message={errors.staffID.message} />}

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
