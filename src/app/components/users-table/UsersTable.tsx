import { FC } from 'react'

import { IUser } from 'api/users/types'
import { Table } from 'app/components/table'
import { ITableHeaderItem } from 'app/components/table/types'

import { UsersTableActions } from './components/actions'
import { UsersTableTooltips } from './components/tooltips'

const tableHeaders: Array<string | ITableHeaderItem> = [
    { label: 'Name', alignment: 'left' },
    { label: 'Email', alignment: 'left' },
    { label: 'Company', alignment: 'left' },
    { label: 'Post Code', alignment: 'left' },
    { label: 'Actions', alignment: 'center' },
]

interface IUsersTableProps {
    users: IUser[]
}

export const UsersTable: FC<IUsersTableProps> = ({ users }) => {
    return (
        <>
            <Table
                headers={tableHeaders}
                rows={users.map((user) => [
                    <p key={`${user.userName}-name`}>
                        {user.firstName} {user.lastName}
                    </p>,
                    <p key={`${user.userName}-email`}>{user.email}</p>,
                    <p key={`${user.userName}-company`}>{user.company}</p>,
                    <p key={`${user.userName}-post-code`}>{user.postCode}</p>,
                    <UsersTableActions
                        key={`${user.userName}-actions`}
                        id={user.id}
                        userName={user.userName}
                    />,
                ])}
            />
            <UsersTableTooltips />
        </>
    )
}
