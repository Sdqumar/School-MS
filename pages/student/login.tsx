import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Success from "../../components/utils/success";
import Error from "../../components/utils/Error";
import Spinner from "../../components/utils/Spinner";
import Errror from "../../components/global/Error";
import Input from "../../components/element/input";
import ButtonSpinner from "../../components/global/buttonSpinner";
type student = {
  password: string;
  admissionNo: string;
};

export default function App() {
  const [, setCookie] = useCookies(["user"]);
  const [success, setSucess] = useState("hidden");
  const [error, setError] = useState("hidden");
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<student>();
  const submitHandler = async (formValues) => {
    setError("hidden");
    setSucess("hidden");
    setLoading(true)
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
        setLoading(false)

      }
    } catch (err) {
      console.log(err);
      setError("block");
      setLoading(false)

    }
    setLoading(false)

  };

  return (
    <div className="max-w-screen-md mx-auto">
      <form
        onSubmit={handleSubmit((formValues) => submitHandler(formValues))}
        className="w-96"
      >
        <h2>Login to Portal </h2>
        <Success className={`mt-5 ${success}`} text="Login successfully" />
        <Error
          className={`mt-5 ${error}`}
          text="Invalid Admission No or Password"
        />

        <Input
          register={register}
          name="admissionNo"
          label="Admission Number"
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


