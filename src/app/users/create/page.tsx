import { Metadata } from 'next'

import { UserForm } from 'app/components/user-form'

export const metadata: Metadata = {
    title: 'Create User - Tech Test',
}

export default function CreateUser() {
    return (
        <>
            <h1 className="text-lg font-semibold text-zinc-700">Create User</h1>

            <div className="bg-white rounded shadow flex-col mt-4 py-6 px-2 w-full">
                <UserForm mode="create" />
            </div>
        </>
    )
}
