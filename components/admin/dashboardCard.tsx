import Image from "next/image";

export default function DashboardCard({number,text}){
    return(
        <div className="flex w-[19rem] h-44 p-5  border relative">

        <div className="mt-16 children:font-semibold ">
          <h3 className="text-4xl">{number}</h3>
          <h3 className="text-xl">{text}</h3>
        </div>
        <div className=" absolute right-24">
          <Image
            src="/pep.jpg"
            layout="fixed"
            alt="Picture of the author"
            width={100}
            height={80}
          />
        </div>

      </div>
    )
}