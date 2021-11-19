import Link from 'next/link'


export default function dashboard (){

const navData=['Staff','Student','Classes','Results']

return(
    <section className="container flex h-screen">

    <div className=" bg-gray-100 w-48 shadow-lg  pt-5 h-full " >
{
    navData.map(item=>(
        <div   className="py-2 text-xl font-medium px-4 hover:bg-white">
        <Link href={`../${item}`} >{item
        }</Link>
    </div>
 
 ))
}
    </div>
 <h1 className="text-gray-700 text-5xl mt-8 ml-14 font-medium">Dashboard</h1>

      
    </section>
)
}