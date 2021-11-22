import Link from 'next/link'
import { useRouter } from 'next/router'


export default function AdminSideBar(WrappedComponent){
    // const router = useRouter()
    // const pathname=router.pathname 
    const navData=['Staff','Student','Classes','Results']

return(
    <div className="flex min-h-full">
     
    <div className=" bg-gray-100 w-48 shadow-lg mr-14 pt-5 h-full " >
    {
        navData.map(item=>{
            const url =`/${item.replace(' ','-').toLowerCase()}`
        return(
            <div  key={item} className="py-2  text-xl font-medium px-4 hover:bg-white">
            <Link href={url} >{item
            }</Link>
        </div>
        
     )})
    }
        </div>
        <WrappedComponent />
    </div>
)
}