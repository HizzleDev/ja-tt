'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useMemo } from 'react'

interface ITablePaginationProps {
    currentPage: number
    limit: number
    totalPages: number
}

export const TablePagination: FC<ITablePaginationProps> = ({
    currentPage,
    limit,
    totalPages,
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const pages = useMemo(() => {
        const createPageItem = (
            displayText: string,
            pageNumber: number,
            hasPrevious: boolean,
            isCurrent: boolean
        ) => (
            <div
                key={pageNumber}
                className={`select-none bg-gray-200 text-zinc-800 px-3 py-1 rounded cursor-pointer ${
                    hasPrevious ? 'ml-2' : ''
                } ${isCurrent ? 'font-semibold' : 'font-normal'}`}
                onClick={() => {
                    const currentSearchParams = new URLSearchParams(
                        Array.from(searchParams.entries())
                    )
                    currentSearchParams.set(
                        'start',
                        ((pageNumber - 1) * limit).toString()
                    )

                    const search = currentSearchParams.toString()
                    const query = search ? `?${search}` : ''

                    router.push(`${pathname}${query}`)
                }}
            >
                {displayText}
            </div>
        )

        if (totalPages < 3 || currentPage === 1) {
            const pageItems = []
            const endIndex = totalPages < 3 ? totalPages : 3
            for (let i = 1; i <= endIndex; i++) {
                pageItems.push(
                    createPageItem(i.toString(), i, i !== 1, i === currentPage)
                )
            }

            return pageItems
        }

        const pagesLeft = totalPages - currentPage

        if (pagesLeft === 0) {
            return [
                createPageItem(
                    (currentPage - 2).toString(),
                    currentPage - 2,
                    false,
                    false
                ),
                createPageItem(
                    (currentPage - 1).toString(),
                    currentPage - 1,
                    true,
                    false
                ),
                createPageItem(currentPage.toString(), currentPage, true, true),
            ]
        }

        return [
            createPageItem(
                (currentPage - 1).toString(),
                currentPage - 1,
                false,
                false
            ),
            createPageItem(currentPage.toString(), currentPage, true, true),
            createPageItem(
                (currentPage + 1).toString(),
                currentPage + 1,
                true,
                false
            ),
        ]
    }, [currentPage, limit, pathname, router, searchParams, totalPages])

    return (
        <div className="flex flex-row justify-center mt-4">
            <div
                className={`select-none ${
                    currentPage === 1 ? 'bg-gray-100' : 'bg-gray-200'
                } ${
                    currentPage === 1 ? 'text-gray-900' : 'text-gray-800'
                } px-3 py-1 rounded select-none ${
                    currentPage === 1 ? 'cursor-default' : 'cursor-pointer'
                }`}
                onClick={() => {
                    const currentSearchParams = new URLSearchParams(
                        Array.from(searchParams.entries())
                    )
                    currentSearchParams.set('start', '0')

                    const search = currentSearchParams.toString()
                    const query = search ? `?${search}` : ''

                    router.push(`${pathname}${query}`)
                }}
            >
                &laquo;
            </div>
            <div
                className={`select-none ${
                    currentPage === 1 ? 'bg-gray-100' : 'bg-gray-200'
                } ${
                    currentPage === 1 ? 'text-gray-900' : 'text-gray-800'
                } px-3 py-1 mx-2 rounded select-none ${
                    currentPage === 1 ? 'cursor-default' : 'cursor-pointer'
                }`}
                onClick={() => {
                    const goToPage = currentPage === 1 ? 1 : currentPage - 1

                    const currentSearchParams = new URLSearchParams(
                        Array.from(searchParams.entries())
                    )
                    currentSearchParams.set(
                        'start',
                        ((goToPage - 1) * limit).toString()
                    )

                    const search = currentSearchParams.toString()
                    const query = search ? `?${search}` : ''

                    router.push(`${pathname}${query}`)
                }}
            >
                &lsaquo;
            </div>
            {pages}
            <div
                className={`select-none ${
                    currentPage === totalPages ? 'bg-gray-100' : 'bg-gray-200'
                } ${
                    currentPage === totalPages
                        ? 'text-gray-900'
                        : 'text-gray-800'
                } px-3 py-1 mx-2 rounded select-none ${
                    currentPage === totalPages
                        ? 'cursor-default'
                        : 'cursor-pointer'
                }`}
                onClick={() => {
                    const goToPage =
                        currentPage === totalPages
                            ? totalPages
                            : currentPage + 1

                    const currentSearchParams = new URLSearchParams(
                        Array.from(searchParams.entries())
                    )
                    currentSearchParams.set(
                        'start',
                        ((goToPage - 1) * limit).toString()
                    )

                    const search = currentSearchParams.toString()
                    const query = search ? `?${search}` : ''

                    router.push(`${pathname}${query}`)
                }}
            >
                &rsaquo;
            </div>
            <div
                className={`select-none ${
                    currentPage === totalPages ? 'bg-gray-100' : 'bg-gray-200'
                } ${
                    currentPage === totalPages
                        ? 'text-gray-900'
                        : 'text-gray-800'
                } px-3 py-1 rounded select-none ${
                    currentPage === totalPages
                        ? 'cursor-default'
                        : 'cursor-pointer'
                }`}
                onClick={() => {
                    const goToPage = totalPages || 1

                    const currentSearchParams = new URLSearchParams(
                        Array.from(searchParams.entries())
                    )
                    currentSearchParams.set(
                        'start',
                        ((goToPage - 1) * limit).toString()
                    )

                    const search = currentSearchParams.toString()
                    const query = search ? `?${search}` : ''

                    router.push(`${pathname}${query}`)
                }}
            >
                &raquo;
            </div>
        </div>
    )
}
