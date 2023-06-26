import React, { CSSProperties, FC } from 'react'

import { Spinner } from 'app/components/spinner'

export interface IButtonProps {
    className?: string
    disabled?: boolean
    displayText: string
    loading?: boolean
    onClick?: () => void
    style?: CSSProperties
}

export const Button: FC<IButtonProps> = ({
    className = '',
    disabled = false,
    displayText,
    loading = false,
    onClick = () => {
        /* do nothing */
    },
    style,
}) => {
    const typeClasses = `border-transparent bg-blue-800 text-white ${
        !disabled && 'hover:bg-sky-700'
    }`

    const disabledClasses = disabled ? 'opacity-30 cursor-not-allowed' : ''

    return (
        <button
            disabled={disabled}
            type="button"
            className={`${className} inline-flex max-w-fit items-center justify-center px-5 py-3 border leading-4 font-medium rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${typeClasses} ${disabledClasses}`}
            onClick={() => {
                if (loading) {
                    return
                }

                onClick()
            }}
            style={style}
        >
            {displayText}
            {loading && <Spinner className="-mb-1 ml-2" size={2} />}
        </button>
    )
}
