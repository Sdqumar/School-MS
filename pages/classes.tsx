import Link from "next/link";
import { getStaffs } from "./api/staff";
import {  useForm } from "react-hook-form";
import subjects from './api/subjects.json'
type classes={
  name:string;
  subjects:['']
}

export default function Classes({ data }) {

 
  
  
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<classes>();



  
  const handleDelete= async ()=>{
    const values= getValues()

    const {subjects} =values
   try {

      const res = await fetch("/api/subject", {
        method: "DELETE",
        body: JSON.stringify(subjects),
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
    
  }
  const submitHandler = async (formValues) => {

    console.log(formValues);
    try {

      const res = await fetch("/api/class", {
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
    <div>
      <h1>Classes</h1>
      <div >
      <AddSubject/>

      </div>

      <form onSubmit={handleSubmit((formValues) => submitHandler(formValues))}>
      <h4>Add Class</h4>

      <input
        {...register("name", {
          required: "Required"
        })}
        type="text"
      />
      {errors.name && <Errror message={errors.name.message} />}
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
      <span style={{cursor:'pointer'}} onClick={handleDelete}>Delete subject</span>
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
    try {

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