import Link from 'next/link'
import { useState } from 'react'


function Navbar() {
  const session = false
  const loading = false

  const handleLogout = async () => {

      const res = await fetch("/api/auth/signout");
       const data = await res.json();
       if(data){
console.log(data);
     }
  };
  return (
    <nav className='header'>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/comment'>
            <a>Blog</a>
          </Link>
        </li>

        {!loading && !session && (
          <li>
            <Link href='/login'>
                              Sign In
            </Link>
          </li>
        )}
        {
          <li>
            <Link href='/signup'>
              Sign Up
            </Link>
          </li>
        }
        {
          <li>
            <Link href='#'>
              <a
                onClick={handleLogout}>
                Sign Out
              </a>
            </Link>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Navbar