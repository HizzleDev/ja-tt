import React, { FC, ReactNode, useCallback } from 'react'

import { ITableHeaderItem } from './types'

interface ITableProps {
    className?: string
    label?: ReactNode
    headers: Array<string | ITableHeaderItem>
    rows: Array<Array<ReactNode>>
}

export const Table: FC<ITableProps> = ({
    className = '',
    label,
    headers,
    rows,
}) => {
    const labelContent =
        typeof label === 'string' ? (
            <p className="text-zinc-700 font-semibold mb-4">{label}</p>
        ) : (
            label
        )

    const getColumnAlignment = useCallback(
        (rowIndex: number) => {
            if (rowIndex >= headers.length || rowIndex < 0) {
                return 'text-left'
            }

            const header = headers[rowIndex]

            if (typeof header === 'string' || header.alignment === 'left') {
                return 'text-left'
            }

            if (header.alignment === 'center') {
                return 'text-center'
            }

            return 'text-right'
        },
        [headers]
    )

    return (
        <div className={`flex flex-col ${className}`}>
            {label && labelContent}
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                {headers.map((header, index) => {
                                    if (typeof header === 'string') {
                                        return (
                                            <th
                                                scope="col"
                                                className={`pt-0 pb-3.5 pl-2 sm:pl-4 pr-1.5 sm:pr-3 text-left text-sm font-semibold text-gray-900 ${
                                                    index === 0
                                                        ? 'sm:pl-6 md:pl-0'
                                                        : ''
                                                }`}
                                                key={header}
                                            >
                                                {header}
                                            </th>
                                        )
                                    }

                                    return (
                                        <th
                                            scope="col"
                                            className={`pt-0 pb-3.5 pl-2 sm:pl-4 pr-1.5 sm:pr-3 text-${
                                                header.alignment
                                            } text-sm font-semibold text-gray-900 `}
                                            key={header.label}
                                        >
                                            {header.label}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rows.map((row, rowIndex) => (
                                <tr key={`row-${rowIndex}`}>
                                    {row.map((column, columnIndex) => (
                                        <td
                                            className={`whitespace-nowrap py-4 pl-2 sm:pl-4 pr-1.5 sm:pr-3 text-sm text-gray-900 ${
                                                rowIndex % 2 === 0
                                                    ? 'bg-gray-100'
                                                    : 'bg-white'
                                            } ${getColumnAlignment(
                                                columnIndex
                                            )}`}
                                            key={`row-${rowIndex}-col-${columnIndex}`}
                                        >
                                            {column}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
