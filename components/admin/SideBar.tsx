import Image from "next/image";
import Link from "next/link";


export default function SideNavBar() {
  const navData = ["Dashboard", "Staff", "Student", "Classes", "Results", "Payment"];

  return (
    <div className="  w-60 shadow-lg  pt-5 h-screen ">
      <div className="flex justify-center items-center ">
        <div className="w-16 h-16 relative  mr-3 z-10">
        <Image
          src="/avatar.jpg"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
          className="object-cover rounded-full"
          />
          </div>
        <div >
          <h3>Isah Kobo</h3>
          <h3 className="text-base font-normal -mt-1">Admin</h3>
        </div>
      </div>
      <div className="mt-5 ml-2">
        {navData.map(item => {
          const active = item == 'Dashboard'
          const url = `/admin/${item.replace(" ", "-").toLowerCase()}/`;

          return (
            <Link href={url} key={item} passHref>
              <div className={`flex justify-between pr-4 py-2 mt-1 items-center hover:bg-gray-50 cursor-pointer ${active && "children:text-blue-500 bg-gray-50"}`}
                key={item}
              >
                <div className="flex justify-around items-center">
                  {
                    active &&
                    <div className={`bg-blue-500 w-1 mr-1 h-9`}></div>
                  }
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <a
                    className="py-2  text-xl font-medium flex flex-col px-4 hover:bg-white"
                  >
                    {item}
                  </a>
                </div>
                <h3>{">"}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
