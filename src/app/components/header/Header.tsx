import React, { FC } from 'react'
import Link from 'next/link'

import { PATHS } from 'utils/paths'

export const Header: FC = () => (
    <div className="w-full bg-blue-800 h-16 shadow">
        <div className="flex items-center px-2 md:px-4 lg:px-8 justify-between h-16">
            <Link
                className="text-white font-bold text-sm sm:text-base cursor-pointer"
                href={PATHS.DASHBOARD}
            >
                THE Tech Test!
            </Link>
            <div>
                <Link
                    className="text-white font-semibold text-sm sm:text-base hover:underline"
                    href={PATHS.DASHBOARD}
                >
                    Dashboard
                </Link>
                <Link
                    className="text-white ml-6 font-semibold text-sm sm:text-base hover:underline"
                    href={PATHS.USERS_CREATE}
                >
                    Create User
                </Link>
            </div>
        </div>
    </div>
)
