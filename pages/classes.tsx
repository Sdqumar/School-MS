import Link from "next/link";
import {  useForm } from "react-hook-form";
import subjects from './api/subjects.json'
import classes from './api/classes.json'
import { useState } from 'react'
import RowSelection from "../components/RowSelection";
type classes={
  name:string;
  subjects:['']
}


const COLUMNS = [
  {
    Header: 'Class',
    accessor: 'name',
  },
  {
    Header: 'Subjects',
    accessor: (originalRow) => 
      originalRow.subjects.map(item=><span key={item}>{item}, </span>)
      
    ,
  },
]

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

const [showAdd,setShowAdd]=useState(false)
  return (
    <section>
      <h1>Classes</h1>
      <div onClick={()=>setShowAdd(true)}>
       Add Class
    </div>

    {showAdd&&
      <>
      <AddSubject/>


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

    </>
}
    <RowSelection TableData={classes} COLUMNS={COLUMNS}/>
     

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