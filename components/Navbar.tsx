import Link from "next/link";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function Navbar() {
  const [user, setUser] = useState(null);
  const [cookies, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const { user } = cookies;
    setUser(user);
    // console.log(user);
  }, [cookies]);

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
    <nav className="header">
      <ul className={`main-nav`}>
        <li>
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
