import Link from 'next/link'
import { getStudents } from '../api/student';
import { useState, useEffect } from "react";


export default function dashboard ({data}){

return(
    <section>
    <h1>Dashboard</h1>

    <div>
        <Link href='/staff'>Result</Link>
    </div>
    <div>
        <Link href='/student'>Profile </Link>
    </div>
  
    <div>
        <Link href='/classes'>Receipt</Link>
    </div>
    <div>
        <Link href='/results'>Payment</Link>
    </div>
    </section>
)
}

export async function getStaticProps() {
    let res = await getStudents();
    let data = await JSON.stringify(res);
  
    return {
      props: { data },
    };
  }