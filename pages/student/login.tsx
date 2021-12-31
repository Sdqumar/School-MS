import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Success from "../../components/utils/success";
import Error from "../../components/utils/Error";
import Spinner from "../../components/utils/Spinner";
import Errror from "../../components/global/Error";
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

        <button className="flex">
          <Spinner loading={loading} /> Submit
          </button>

      </form>
    </div>
  );
}


