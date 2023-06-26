import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import React, { FC, ReactNode } from 'react'

export type InputType = 'text' | 'number' | 'email' | 'password'

interface IInputProps {
    description?: ReactNode
    disabled?: boolean
    errorText?: string
    label?: string
    onBlur?: () => void
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    onFocus?: () => void
    placeholder?: string
    type?: InputType
    value: number | string
}

export const Input: FC<IInputProps> = ({
    description,
    disabled = false,
    errorText,
    label,
    onBlur = () => {},
    onChange,
    onFocus = () => {},
    placeholder,
    type = 'text',
    value,
}) => {
    const inputClasses = !!errorText
        ? 'border border-red-500 pr-10'
        : 'border border-zinc-300 px-2 md:px-3'
    const labelClasses = !!errorText ? 'text-red-500' : 'text-zinc-700'

    const descriptionContent =
        typeof description === 'string' ? (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
        ) : (
            description
        )

    const disabledClasses = disabled ? 'bg-gray-100' : 'bg-white'

    return (
        <div>
            {!!label && (
                <label
                    htmlFor="email"
                    className={`block text-xs md:text-sm ${labelClasses}`}
                >
                    {label}
                </label>
            )}
            <div className="mt-1 relative">
                <input
                    autoComplete="off"
                    disabled={disabled}
                    type={type}
                    name="email"
                    id="email"
                    className={`focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 block w-full py-1 md:py-2 text-sm md:text-base text-zinc-700 rounded ${inputClasses} ${disabledClasses}`}
                    placeholder={placeholder}
                    aria-invalid="true"
                    aria-describedby="email-error"
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    value={value}
                />
                {!!errorText && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
            {descriptionContent}
            {!!errorText && (
                <p
                    className="mt-1 text-xs font-semibold text-red-600"
                    id="email-error"
                >
                    {errorText}
                </p>
            )}
        </div>
    )
}
