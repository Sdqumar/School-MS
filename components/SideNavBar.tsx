import Link from 'next/link'


export default function SideNavBar({navData}){
return(
    <div className=" bg-gray-100 w-48 shadow-lg mr-14 pt-5 h-full " >
    {
        navData.map(item=>(
            <div  key={item} className="py-2  text-xl font-medium px-4 hover:bg-white">
            <Link href={`./${item.toLowerCase()}`} >{item
            }</Link>
        </div>
     
     ))
    }
        </div>
)
}