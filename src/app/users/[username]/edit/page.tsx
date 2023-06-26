import { Metadata } from 'next'
import { FC } from 'react'

import { UserForm } from 'app/components/user-form'
import { getUser } from 'api/users/get-user'

export const metadata: Metadata = {
    title: 'Edit User - Tech Test',
}

interface IEditUserProps {
    params?: Record<string, string>
}

const EditUserView: FC<IEditUserProps> = async ({ params }) => {
    const user = await getUser(params.username)

    return (
        <>
            <h1 className="text-lg font-semibold text-zinc-700">Edit User</h1>

            <div className="bg-white rounded shadow flex-col mt-4 py-6 px-2 w-full">
                <UserForm mode="edit" user={user} />
            </div>
        </>
    )
}

export default EditUserView
