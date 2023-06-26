'use client'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useCallback } from 'react'

import { deleteUser } from 'api/users/delete-user'
import { PATHS } from 'utils/paths'

interface IUserTableActionsProps {
    id: string
    userName: string
}

export const UsersTableActions: FC<IUserTableActionsProps> = ({
    id,
    userName,
}) => {
    const router = useRouter()
    const tryDeleteUser = useCallback(async () => {
        try {
            await deleteUser(id)
            router.refresh()

            alert(
                'Wow. No modal to confirm but you still managed to delete the user...'
            )
        } catch (e) {
            console.error(e)
            alert(
                'Something went wrong when deleting the user. Please try again.'
            )
        }
    }, [id, router])

    return (
        <div className="flex flex-row justify-center">
            <Link href={PATHS.USERS_EDIT(userName)}>
                <PencilSquareIcon className="h-6 cursor-pointer edit-user" />
            </Link>
            <TrashIcon
                className="ml-2 h-6 cursor-pointer delete-user"
                onClick={tryDeleteUser}
            />
        </div>
    )
}
