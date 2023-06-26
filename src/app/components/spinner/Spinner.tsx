import React, { FC } from 'react'

import { SpinnerSize } from './types'

interface ISpinnerProps {
    className?: string
    size: SpinnerSize
}

const getOuterClasses = (size: SpinnerSize) => {
    switch (size) {
        case 1:
            return 'h-[10px] w-[10px]'
        case 2:
            return 'h-[20px] w-[20px]'
        case 3:
            return 'h-[30px] w-[30px]'
        case 4:
            return 'h-[40px] w-[40px]'
        case 5:
            return 'h-[50px] w-[50px]'
        case 6:
            return 'h-[60px] w-[60px]'
        case 7:
            return 'h-[70px] w-[70px]'
    }
}

const getInnerClasses = (size: SpinnerSize) => {
    switch (size) {
        case 1:
            return 'h-[8px] w-[8px] border-[1px] m-[1px] border-sky-600'
        case 2:
            return 'h-[16px] w-[16px] border-[2px] m-[2px] border-sky-600'
        case 3:
            return 'h-[24px] w-[24px] border-[3px] m-[3px] border-sky-600'
        case 4:
            return 'h-[32px] w-[32px] border-[4px] m-[4px] border-sky-600'
        case 5:
            return 'h-[40px] w-[40px] border-[5px] m-[5px] border-sky-600'
        case 6:
            return 'h-[48px] w-[48px] border-[6px] m-[6px] border-sky-600'
        case 7:
            return 'h-[56px] w-[56px] border-[7px] m-[7px] border-sky-600'
    }
}

export const Spinner: FC<ISpinnerProps> = ({ className = '', size }) => {
    const innerClasses = getInnerClasses(size)
    const outerClasses = getOuterClasses(size)

    return (
        <div className={`${outerClasses} spinner ${className}`}>
            <div className={innerClasses}></div>
            <div className={innerClasses}></div>
            <div className={innerClasses}></div>
            <div className={innerClasses}></div>
        </div>
    )
}
