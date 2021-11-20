import Link from "next/link";
import { useState, useEffect } from "react";
import useStore from "../../components/useStore";
import Image from "next/image";
import SideNavBar from "../../components/SideNavBar";

export default function StudentDashboard() {
  const user = useStore((state) => state.user);
  const navData = ["Staff", "Student", "Classes", "Results"];

 const  userProfile=[
   {name:'Admission-No',value:user?.admissionNo},
   {name:'Full-Name',value:user?.fullName},
   {name:'Class',value:user?.class},
   {name:'House',value:user?.house},
   {name:'Age',value:user?.age},
  ]
  return (
    <div className="flex h-screen">
      <SideNavBar navData={navData} />

      <main className=" align-center border-2 border-blue-300 border-solid flex mt-14  h-44">
          <div className="flex flex-col">
        {

          userProfile.map(item=>(
            <div className="flex children:w-40 h-screen bg-gray-100 font-medium">
              <span className="text-center  bg-blue-200     
                 border-solid  border-b-2 last:border-0">{item.name}</span>
              <span className="ml-3">{item.value}</span>
            </div>
          ))
        }
          </div>
        <Image
          src="/avatar.jpg"
          alt="Picture of the author"
          width={180}
          height={30}
        />
      </main>
    </div>
  );
}
