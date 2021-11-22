import Link from "next/link";
import { FilteringTable } from "../../components/FiltertingTable";
import { getStudents } from "../api/student";


const COLUMNS = [
   
  {
    Header: 'No',
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
    
    <section>
      <h1>Students</h1>
      <div>
        <Link href="/student/signup">Add New Student</Link>
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
