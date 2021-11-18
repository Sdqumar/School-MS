import Link from 'next/link'


export default function dashboard (){

return(
    <section>
    <h1>Dashboard</h1>

    <div>
        <Link href='../staff'>Staffs</Link>
    </div>
    <div>
        <Link href='../student'>Students</Link>
    </div>
  
    <div>
        <Link href='../classes'>Classes</Link>
    </div>
    <div>
        <Link href='../results'>Results</Link>
    </div>
    </section>
)
}