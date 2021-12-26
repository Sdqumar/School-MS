import Link from "next/link";
import { FilteringTable } from "../../components/FiltertingTable";
import { getStudents } from "../api/student";
import { useCookies } from "react-cookie";

export default function Students({ data }) {
  const res = JSON.parse(data);

  const [, setCookie] = useCookies(["user"]);
  
  const goToProfile = (item) => {
    setCookie("user", item, { path: "/" });
    window.open("http://localhost:3000/student", "_blank");
  };

  const COLUMNS = [
    {
      Header: "Admission No",
      accessor: (row) => (
        <a onClick={() => goToProfile(row)}>{row.admissionNo}</a>
      ),
    },
    {
      Header: "Full Name",
      accessor: (row) => (
        <a
          onClick={() => goToProfile(row)}
          className="hover:underline
        cursor-pointer
        "
        >
          {row.fullName}
        </a>
      ),
    },

    {
      Header: "Class",
      accessor: "class",
    },
    {
      Header: "House",
      accessor: "house",
    },
    {
      Header: "Age",
      accessor: "age",
    },
  ];

  return (
    <section className="mx-10 mb-4">
      <div className="ml-3">
        <h1>Students</h1>
        <div className="link">
          <Link href="/student/signup">Add New Student</Link>
        </div>
      </div>

      {!res && <h2>Error fatching Students list...</h2>}
      {res && <FilteringTable tableData={res} COLUMNS={COLUMNS} />}
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
