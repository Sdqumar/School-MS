import Link from "next/link";
import { FilteringTable } from "../../components/FiltertingTable";
import { getStudents } from "../api/student";


const COLUMNS = [
   
  {
    Header: 'Admission No',
    accessor: 'admissionNo',
  },
  {
    Header: 'Full Name',
    accessor: 'fullName',
  },

  {
    Header: 'Class',
    accessor: 'class',
  },
  {
    Header: 'House',
    accessor: 'house',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  
]

export default function Students({ data }) {

  const res = JSON.parse(data);

  return (
    
    <section className="mx-10 mb-4">
      <div className="ml-3">

      <h1>Students</h1>
      <div className="link">
        <Link href="/student/signup">Add New Student</Link>
      </div>
      </div>

    {!res && <h2>Error fatching Students list...</h2>}
        { res  &&
        <FilteringTable tableData={res} COLUMNS={COLUMNS}/>
        }
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
