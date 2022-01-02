import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import ButtonSpinner from "../../components/global/buttonSpinner";
import Input from "../../components/global/input";

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
    setLoading(true)

    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      } else {
        console.log({ message: 'Logging successfully' });

        setCookie('user', data, { path: '/' });
        setLoading(false)

      }
    } catch (err) {
      console.log(err);
      setLoading(false)

    }
    setLoading(false)

  };
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-screen-md mx-auto">

      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}

      >
        <h2 className="-mt-2">Staff Login to Portal</h2>
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
        <ButtonSpinner loading={loading} />
      </form>
    </div>
  );
}
