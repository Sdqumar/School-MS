import Link from "next/link";

export default function SideNavBar() {
  const navData = ["Profile", "Print Result", "Print Recipt", "Payment"];
  return (
    <div className=" bg-gray-100 w-full shadow-lg mr-14 pt-5 h-screen ">
      {navData.map((item) => {
        let url
        if(item=== 'Profile'){
          url = '/student/'
        }else{

           url = `/student/${item.replace(" ", "")}/`;
        }
        

        return (
          <Link href={url} key={item}>
            <a
              key={item}
              className="py-2  text-xl font-medium flex flex-col px-4 hover:bg-white"
            >
              {item}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
