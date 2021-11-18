import Link from 'next/link'
import { getStudents } from '../api/student';
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";


export default function dashboard ({data}){
    const [user, setUser] = useState(null);
    const [cookies, removeCookie] = useCookies(["user"]);
  
    useEffect(() => {
      const { user } = cookies;
      setUser(user);
    //   console.log(user);
    }, [cookies]);
  

const res = JSON.parse(data)

const [userData] =res.filter(item=>item._id == user)
console.log(userData);

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