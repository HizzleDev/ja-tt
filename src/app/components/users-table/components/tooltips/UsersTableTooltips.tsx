'use client'

import { FC } from 'react'
import { Tooltip } from 'react-tooltip'

export const UsersTableTooltips: FC = () => (
    <>
        <Tooltip anchorSelect=".edit-user" content="Edit User" />
        <Tooltip anchorSelect=".delete-user" content="Delete User" />
    </>
)
