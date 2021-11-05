import React,{useMemo} from 'react'
import { useTable } from 'react-table'

const COLUMNS = [
   
  {
    Header: 'Subject',
    accessor: 'name',
  },
  {
    Header: '1st CA',
    accessor: 'firstCA',
  },

  {
    Header: '2nd CA',
    accessor: 'secondCA',
  },
  {
    Header: 'Exam',
    accessor: 'examScore',
  },
  {
    Header: 'Total',
    accessor:'totalScore'
  },
  {
    Header: 'Grade',
    accessor:'grade'
  },
  ,
  {
    Header: 'Remark',
    accessor: 'remark'
  },
]


export default function Table( {result }) {
  const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => result, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    },
  )
  

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
          {rows.map((row) => {
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





  

