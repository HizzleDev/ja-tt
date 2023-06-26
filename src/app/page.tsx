import { Metadata } from 'next'
import { FC } from 'react'

import { getTotalUsers } from 'api/users/get-total-users'
import { listUsers } from 'api/users/list-users'
import { TablePagination } from 'app/components/table/pagination'
import { UsersTable } from 'app/components/users-table'
import { isNumeric } from 'utils/common'

export const metadata: Metadata = {
    title: 'Welcome - Tech Test',
}

interface IDashboardViewProps {
    searchParams?: Record<string, string>
}

const LIMIT = 15

const DashboardView: FC<IDashboardViewProps> = async ({ searchParams }) => {
    const totalUsers = await getTotalUsers()
    const TOTAL_PAGES = Math.ceil(totalUsers / LIMIT)

    let start = 0
    let currentPage = 1
    if (!!searchParams?.start) {
        if (isNumeric(searchParams.start) && Number(searchParams.start) > 0) {
            let potentialStartNumber = Math.abs(
                Math.floor(Number(searchParams.start))
            )
            const remainder = potentialStartNumber % LIMIT
            potentialStartNumber -= remainder

            start =
                potentialStartNumber >= totalUsers
                    ? (TOTAL_PAGES - 1) * LIMIT
                    : potentialStartNumber

            currentPage = start <= 0 ? 1 : Math.ceil(start / LIMIT) + 1
        }
    }

    const users = await listUsers(start, LIMIT)

    return (
        <>
            <h1 className="text-lg font-semibold text-zinc-700">Dashboard</h1>

            <div className="bg-white rounded shadow flex-col mt-4 py-6 px-2 w-full">
                <UsersTable users={users} />
                <TablePagination
                    currentPage={currentPage}
                    limit={LIMIT}
                    totalPages={TOTAL_PAGES}
                />
            </div>
        </>
    )
}

export default DashboardView
