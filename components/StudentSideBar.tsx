import Link from "next/link";

export default function SideNavBar() {
  const navData = ["Profile", "Print result", "Print recipt", "Payment"];
  return (
    <div className=" bg-gray-100 w-full shadow-lg mr-14 pt-5 h-screen ">
      {navData.map((item) => {
        const url = `/student/${item.replace(" ", "-").toLowerCase()}/`;

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
