import { CSSProperties, FC, ReactNode } from 'react'

interface ContainerProps {
    children?: ReactNode
    outerStyle?: CSSProperties
}

export const Container: FC<ContainerProps> = ({
    children,
    outerStyle = {},
}) => {
    return (
        <div
            className="p-2 sm:p-4 md:p-6 lg:p-8 w-full"
            style={outerStyle}
        >
                {children}
        </div>
    )
}
