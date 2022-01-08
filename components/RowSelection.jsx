import React,{useMemo} from 'react'
import { useTable, useRowSelect } from 'react-table'


export default function Table( {TableData,COLUMNS }) {
  const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => TableData, []);
   
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
        useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            {
              id: 'selection',
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
            },
            ...columns
          ])
        }
      )
      const handleDelete=async()=>{

          const values = selectedFlatRows.map(row => row.original)

          try {

            const res = await fetch("/api/class", {
              method: "DELETE",
              body: JSON.stringify(values),
              headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.errors) {
              console.log(data.errors);
            }else {
              // location.assign("/");
              console.log(data);
              
            }
          } catch (err) {
            console.log(err);
          }
      }
  

  return (
    <div>
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
          {rows.map(row => {
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
   <button onClick={handleDelete}>Delete</button>
    </div>
  )
}






export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
  
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
  
    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} style={{width:'20px'}} />
      </>
    )
  })