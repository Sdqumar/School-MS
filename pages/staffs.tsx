import Link from "next/link";
import { getStaffs } from "./api/staff";

export default function Staffs({ data }) {

  const res = JSON.parse(data);

  return (
    <section>
      <h1>Staffs</h1>
      <div>
        <Link href="/staff/signup">Add New Staff</Link>
      </div>
    {!res && <h2>Error fatching staff list...</h2>}
      <ul>
        { res && res.map((item) => {
          const name = `${item.firstName}  ${item.lastName}`;
          
          return (
            <li key={item.id}>
              {name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export async function getStaticProps() {
  let res = await getStaffs();
  let data = await JSON.stringify(res);
  
  return {
    props: { data },
  };
}
