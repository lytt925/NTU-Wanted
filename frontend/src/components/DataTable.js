/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
    useTable, useAsyncDebounce, useGlobalFilter, useSortBy, usePagination,
} from 'react-table'

const TWO_HUNDRED_MS = 200

function GlobalFilter({
    globalFilter,
    setGlobalFilter,
}) {
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce((values) => {
        setGlobalFilter(values || undefined)
    }, TWO_HUNDRED_MS)

    return (
        <input
            value={value || ''}
            onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
            placeholder="Search"
        />
    )
}

function ReactTable() {
    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        [],
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
        ],
        [],
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,

        // globalFilter
        setGlobalFilter,
        state: { globalFilter },

        // usePagination
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    return (
        <>
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                        >
                            <GlobalFilter
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' ⬇️'
                                                : ' ⬆️'
                                            : ' ↕️'}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}

                <span>
                    Page{' '}
                    <strong>{pageIndex + 1} of {pageCount}</strong>{' '}
                </span>

                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30].map((item) => (
                        <option key={item} value={item}>
                            Show {item}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default ReactTable