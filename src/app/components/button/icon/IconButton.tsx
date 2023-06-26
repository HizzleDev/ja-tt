'use client'

import { FC, ReactNode } from 'react'

interface IIconButton {
    icon: ReactNode
    onClick?: () => void
}

export const IconButton: FC<IIconButton> = ({
    icon,
    onClick = () => {
        /* do nothing */
    },
}) => <div onClick={onClick}>{icon}</div>
