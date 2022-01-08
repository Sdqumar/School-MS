import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import ButtonSpinner from "../../components/global/buttonSpinner";
import Input from "../../components/global/input";
import Success from "../../components/utils/success";
import Error from "../../components/utils/Error";

type staff = {
  password: string;
  staffID: string;
};

export default function App() {
  const [cookies, setCookie] = useCookies(['user']);
  const [success, setSucess] = useState("hidden");
  const [error, setError] = useState("hidden");
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<staff>();
  const submitHandler = async (formValues) => {
    setLoading(true)
    setError("hidden");
    setSucess("hidden");

    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
        setError("block")
      } else {
        console.log('Logging successfully');
        setSucess("block");

        setCookie('user', data, { path: '/' });
        setLoading(false)
        location.assign("/");


      }
    } catch (err) {
      console.log(err);
      setLoading(false)
      setError("block");

    }
    setLoading(false)

  };

  return (
    <div className="max-w-screen-md mx-auto">

      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}

      >
        <h2 className="-mt-2">Staff Login to Portal</h2>
        <Success className={`mt-5 ${success}`} text="Login successfully" />
        <Error
          className={`mt-5 ${error}`}
          text="Invalid Staff ID or Password"
        />

        <div className="mt-5"></div>
        <Input
          register={register}
          name="staffID"
          label="Staff ID"
          errors={errors}
        />
        <Input
          register={register}
          name="password"
          label="Password"
          type="password"
          errors={errors} />
        <ButtonSpinner loading={loading}/>
      </form>
    </div>
  );
}
