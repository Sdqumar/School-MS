import Link from "next/link";
import { useState, useEffect } from "react";
import useStore from "../../components/useStore";
import Image from 'next/image'
export default function dashboard() {
  const user = useStore((state) => state.user);

  return (
    <div style={{ display: "flex" }}>
      <section>
        <h1>Dashboard</h1>

        <div>
          <Link href="/staff">Result</Link>
        </div>
        <div>
          <Link href="/student">Profile </Link>
        </div>

        <div>
          <Link href="/classes">Receipt</Link>
        </div>
        <div>
          <Link href="/results">Payment</Link>
        </div>
      </section>

      <main className="align-center border-2 border-blue-300 border-solid flex mt-14  h-"
      >
        <ul>
          <li>
            <span>Admission-No  </span>
            <span>{user?.admissionNo}</span>
          </li>
          <li>
            <span>Full-Name  </span>
            <span>{user?.fullName}</span>
          </li>
          <li>
            <span>Class </span>
            <span>
            {user?.class}

            </span>
          </li>
          <li>
            <span>House  </span>
            <span>
            {user?.house}

            </span>
          </li>
          <li>
            <span>Age  </span>
            <span>
            {user?.age}

            </span>
          </li>
        </ul>
        <Image
        src="/avatar.jpg"
        alt="Picture of the author"
        width={180}
        height={30}
        className=""
      />
      </main>
    </div>
  );
}
