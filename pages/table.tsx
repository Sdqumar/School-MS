import { useMemo,useState } from "react";
import 'regenerator-runtime/runtime' 
import { useTable,useSortBy,useGlobalFilter,useFilters,useAsyncDebounce } from "react-table";
import MOCK_DATA from "../components/MOCK_DATA.json";


export const ColumnFilter = ({column})=>{
    const {filterVlaue,setFilter} = column
    return(
        <span>
            <input value={filterVlaue } onChange={(e)=>setFilter(e.target.value)
                }  />
        </span>
    )
    }
const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters:true
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
},
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
},
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
},
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
},
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
},
];

const GROUP_COLUMNS =[
    {
        Header: "Id",
        Footer: "Id",
        accessor: "id",
    },{
        Header: "Name",
        Footer: "Name",
        columns:[

            {
                Header: "First Name",
                Footer: "First Name",
                accessor: "first_name",
              },
              {
                Header: "Last Name",
                Footer: "Last Name",
                accessor: "last_name",
              }
        ]
    },
    {
        Header: "Info",
        Footer: "Info",
        columns:[
        
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "Date_of_birth",
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
        ]
    }
]
export default function BasicTable() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const defaultColumn = useMemo(() => {
      return{
          Filter:ColumnFilter
      }
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    defaultColumn
  },useFilters,useGlobalFilter, useSortBy,);
const {globalFilter} =state
  return (
    <div>
        <GlobalFilter filter={globalFilter}
        setFilter={setGlobalFilter}/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
<div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
        {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <th {...column.getFooterProps()}>{column.render("Footer")}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}


export const GlobalFilter = ({filter,setFilter})=>{
    const [value,setValue]=useState(filter)

    const onChange=useAsyncDebounce(value=>{
        setFilter(value || undefined)
    },30)
return(
    <span>
        <label>Search</label>
        <input value={filter || ''} onChange={(e)=>{
            
            setValue(e.target.value)
            onChange(e.target.value)
            }}/>
    </span>
)
}

