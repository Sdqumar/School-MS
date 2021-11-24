import Link from "next/link";
import { FilteringTable } from "../../components/FiltertingTable";
import { getStaffs } from "../api/staff";


const COLUMNS = [
   
  {
    Header: 'Staff ID',
    accessor: 'staffID',
  },
  {
    Header: 'Full Name',
    accessor: 'fullName',
  },

  {
    Header: 'Level',
    accessor: 'level',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
 

  
]

export default function Students({ data }) {

  const res = JSON.parse(data);

  return (
    <section>
      <div className="ml-8">

      <h1>Staffs</h1>
      <div className="link">
        <Link href="/staff/signup">Add New Staff</Link>
      </div>
      </div>
        

    {!res && <h2>Error fatching Staffs list...</h2>}
        { res  &&
        <FilteringTable tableData={res} COLUMNS={COLUMNS}/>
        }
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
