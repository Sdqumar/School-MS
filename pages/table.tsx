import React,{ useMemo,useState } from "react";
import 'regenerator-runtime/runtime' 
import { useTable,useSortBy,useGlobalFilter,useFilters,useAsyncDebounce,usePagination,useRowSelect } from "react-table";
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
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => MOCK_DATA, []);
//   const defaultColumn = useMemo(() => {
//       return{
//           Filter:ColumnFilter
//       }
//   }, []);
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     footerGroups,
//     rows,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     prepareRow,
//     state,
//     setPageSize,
//     setGlobalFilter,
//     selectedFlatRows,
//     allColumns,
//     getToggleHideAllColumnsProps
//   } = useTable({
//     columns,
//     data,
//     defaultColumn
//   },useFilters,useGlobalFilter, useSortBy,usePagination,useRowSelect,
//   hooks => {
//     hooks.visibleColumns.push(columns => [
//       {
//         id: 'selection',
//         Header: ({ getToggleAllRowsSelectedProps }) => (
//           <Checkbox {...getToggleAllRowsSelectedProps()} />
//         ),
//         Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
//       },
//       ...columns
//     ])
//   });
// const {globalFilter,pageIndex,pageSize} =state
  return (
      <RowSelection/>
//     <div>
// <div>
//     <Checkbox {...getToggleHideAllColumnsProps()}/> 
//     ToggleAll
// </div>
// {
//     allColumns.map(column=>(
//         <span key={column.id}>
// <label htmlFor={column.id}>
//     <input  type='checkbox' {...column.getToggleHiddenProps()}/>
//     {column.Header}
// </label>
//         </span>
//     ))
// }

//         <GlobalFilter filter={globalFilter}
//         setFilter={setGlobalFilter}/>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}
// <div>{column.canFilter ? column.render('Filter') : null}</div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//         {/* <tfoot>
//         {footerGroups.map((footerGroup) => (
//             <tr {...footerGroup.getFooterGroupProps()}>
//               {footerGroup.headers.map((column) => (
//                 <th {...column.getFooterProps()}>{column.render("Footer")}</th>
//               ))}
//             </tr>
//           ))}
//         </tfoot> */}
//       </table>
//       <pre>
//         <code>
//           {JSON.stringify(
//             {
//               selectedFlatRows: selectedFlatRows.map(row => row.original)
//             },
//             null,
//             2
//           )}
//         </code>
//       </pre>
// <div>
//     <span>
//         <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
// {
//     [10,20,50].map(pageSize=>(
//         <option key={pageSize} value={pageSize}>show {pageSize}</option>
//     ))
// }
//         </select>
//     </span>
// <span>Page {' '}
//      <strong> {pageIndex +1} of   {pageOptions.length}</strong>
// </span>
// <div style={{display:'flex'}}>

//     <button onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
//     <button onClick={nextPage} disabled={!canNextPage}>Next</button>
// </div>
// </div>
//     </div>
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

// export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef()
//     const resolvedRef = ref || defaultRef
  
//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])
  
//     return (
//       <>
//         <input type='checkbox' ref={resolvedRef} {...rest} style={{width:'20px'}} />
//       </>
//     )
//   })


  export const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows
    } = useTable(
      {
        columns,
        data
      },
     
    )
  
    const firstPageRows = rows.slice(0, 10)
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
     
      </>
    )
  }