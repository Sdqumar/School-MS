import Link from "next/link";
import { getStaffs } from "./api/staff";
import {  useForm } from "react-hook-form";

type classes={
  className:string;
  subjects:['']
}
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

export default function Classes({ data }) {

  // const res = JSON.parse(data);
  
  
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
    <div>
      <h1>Classes</h1>
      <div >
      <AddSubject/>

      </div>

      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h4>Add Class</h4>

      <input
        {...register("className", {
          required: "Required"
        })}
        type="text"
      />
      {errors.className && <Errror message={errors.className.message} />}
<br/>
<br/>
          <h3>Subjects</h3>
          <div>
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
    </div>
  );
}

// export async function getStaticProps() {
//   let res = await getStaffs();
//   let data = await JSON.stringify(res);
  
//   return {
//     props: { data },
//   };
// }

export const AddSubject=()=>{
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async (formValues) => {
    console.log(formValues.subject);
     subjects.push(formValues.subject)
    console.log(subjects);
    
    
  }
  return(
    <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}  style={{float:'right',width:'300px',margin:'18px'}}>
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
  )
}

type errorProps = {
    message?: string | undefined;
  };
  export function Errror({ message }: errorProps) {
    return <p>{message}</p>;
  }