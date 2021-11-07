import Link from "next/link";
import { getStudents } from "../api/student";

export default function Students({ data }) {

  const res = JSON.parse(data);

  return (
    <section>
      <h1>Students</h1>
      <div>
        <Link href="/student/signup">Add New Student</Link>
      </div>
    {!res && <h2>Error fatching Students list...</h2>}
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
  let res = await getStudents();
  let data = await JSON.stringify(res);
  
  return {
    props: { data },
  };
}
