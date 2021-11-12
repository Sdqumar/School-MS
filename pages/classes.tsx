import Link from "next/link";
import { getStaffs } from "./api/staff";
import {  useForm } from "react-hook-form";

type classes={
  className:string;
  subjects:['']
}

export default function Classes({ data }) {

  // const res = JSON.parse(data);
  const subjects = [
    "English Language",
    "Mathematics",
    "Verbal Reasoning",
    "Spelling",
    "Quantitative Reasoning",
    "Elementary Science",
    "Social Studies",
    "Vocational Aptitude",
    "Health Education",
    "Bible Knowledge",
    "Languages",
    "Creative Arts",
    "Computer",
    "Agric Science",
    "Civic Education",
    "Music",
    "Moral Instruction",
    "Handwriting",
  ];
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<classes>();
  const submitHandler = async (formValues) => {

    console.log(formValues);
    // try {

    //   const res = await fetch("/api/subject", {
    //     method: "POST",
    //     body: JSON.stringify(formValues),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const data = await res.json();
    //   if (data.errors) {
    //     console.log(data.errors);
    //   }else {
    //     // location.assign("/");
    //     console.log(data);
        
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <section>
      <h1>Classes</h1>

      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h4>Add Class</h4>

      <input
        {...register("className", {
          required: "Required"
        })}
        type="text"
      />
      {errors.className && <Errror message={errors.className.message} />}

          <h3>Subjects</h3>
          <div >
          {
          subjects.map(
              (item) =><span key={item} style={{display:'flex',alignItems:'center',justifyContent:"space-between",width:'fit-content'}}> 
                 <input type="checkbox" value={item}     {...register("subjects")} />
                 
                 <strong style={{marginLeft:'10px'}}>
                 {item}</strong></span>
            )
          }
        </div>

      <button>submit</button>
    </form>

     
    {/* {!res && <h2>Error fatching staff list...</h2>}
      {/* <ul>
        { res && res.map((item) => {
          const name = `${item.firstName}  ${item.lastName}`;
          
          return (
            <li key={item.id}>
              {name}
            </li>
          );
        })}
      </ul> */} 
    </section>
  );
}

// export async function getStaticProps() {
//   let res = await getStaffs();
//   let data = await JSON.stringify(res);
  
//   return {
//     props: { data },
//   };
// }

type errorProps = {
    message?: string | undefined;
  };
  export function Errror({ message }: errorProps) {
    return <p>{message}</p>;
  }