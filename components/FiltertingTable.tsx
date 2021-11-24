import { useTable, useFilters, useGlobalFilter } from "react-table";
import React, { useState, useMemo } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";

export const FilteringTable = ({ tableData, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <div
    className="mb-2 flex justify-center place-items-center"
    >
      <strong className="mr-2">Search:</strong>{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
