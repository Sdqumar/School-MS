import Link from 'next/link'
import { useRouter } from 'next/router'


export default function SideNavBar({navData}){
    const Router= useRouter
    const router = useRouter()
    const pathname=router.pathname 
    
return(
    <div className=" bg-gray-100 w-48 shadow-lg mr-14 pt-5 h-full " >
    {
        navData.map(item=>(
            <div  key={item} className="py-2  text-xl font-medium px-4 hover:bg-white">
            <Link href={`${pathname +'/'+item.toLowerCase()}`} >{item
            }</Link>
        </div>
     
     ))
    }
        </div>
)
}