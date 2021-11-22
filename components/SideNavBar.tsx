import Link from 'next/link'
import { useRouter } from 'next/router'


export default function SideNavBar({navData}){
    const router = useRouter()
    const pathname=router.pathname 
    
return(
    <div className=" bg-gray-100 w-48 shadow-lg mr-14 pt-5 h-screen " >
    {
        navData.map(item=>{
            const url =`${pathname}/${item.replace(' ','-').toLowerCase()}`
        return(
            <div  key={item} className="py-2  text-xl font-medium px-4 hover:bg-white">
            <Link href={url} >{item
            }</Link>
        </div>
        
     )})
    }
        </div>
)
}