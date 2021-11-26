import Link from "next/link";
import { useRouter } from "next/router";

export default function SideNavBar({ navData }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className=" bg-gray-100 w-full shadow-lg mr-14 pt-5 h-screen ">
      {navData.map((item) => {
        const url = `${pathname}/${item.replace(" ", "-").toLowerCase()}`;
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
