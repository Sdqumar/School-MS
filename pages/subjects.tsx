import Link from "next/link";
import { getStaffs } from "./api/staff";
import {  useForm } from "react-hook-form";


type staff = {
    subject: string;
  };
export default function Subjects({ data }) {

  const res = JSON.parse(data);


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<staff>();
  const submitHandler = async (formValues) => {

    try {
    console.log(formValues);

      const res = await fetch("/api/subject", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
      }else {
        // location.assign("/");
        console.log(data);
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <h1>Subjects</h1>

      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h4>Add Subject</h4>

      <input
        {...register("subject", {
          required: "Required"
        })}
        type="text"
      />
      {errors.subject && <Errror message={errors.subject.message} />}

      <button>submit</button>
    </form>

     
    {!res && <h2>Error fatching staff list...</h2>}
      <ul>
        { res && res.map((item) => {
          const name = `${item.firstName}  ${item.lastName}`;
          
          return (
            <li key={item.id}>
              {name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export async function getStaticProps() {
  let res = await getStaffs();
  let data = await JSON.stringify(res);
  
  return {
    props: { data },
  };
}

type errorProps = {
    message?: string | undefined;
  };
  export function Errror({ message }: errorProps) {
    return <p>{message}</p>;
  }