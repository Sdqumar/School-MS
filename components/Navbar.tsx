import Link from "next/link";
import { useCookies } from "react-cookie";
import useStore from "./useStore";

function Navbar() {
  const user = useStore((state) => state.user);

  const [,removeCookie] = useCookies(["user"]);

  const handleLogout = async () => {
    const res = await fetch("/api/signout");
    const data = await res.json();
    if (data) {
      console.log(data);
    }
    removeCookie("user", "", { maxAge: 1 });
    console.log("cookie removed");
  };
  return (
    <nav className="font-medium w-2/4 text-2xl  shadow-md  text-gray-500 ">
      <ul className="flex justify-around py-4 px-4">
        <li >
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>

        {!user && (
          <>
            <li>
              <Link href="/staff/login">Sign In</Link>
            </li>
            <li>
              <Link href="/staff/signup">Sign Up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <Link href="#">
              <a onClick={handleLogout}>Sign Out</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
