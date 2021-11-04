import Link from 'next/link'


export default function dashboard (){

return(
    <section>
    <h1>Dashboard</h1>

    <div>
        <Link href='/staffs'>Staffs</Link>
    </div>
    <div>
        <Link href='/students'>Students</Link>
    </div>
  
    <div>
        <Link href='/subjects'>Subjects</Link>
    </div>
    <div>
        <Link href='/results'>Results</Link>
    </div>
    </section>
)
}