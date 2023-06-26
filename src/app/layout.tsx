import 'styles/global.css'

import { Header } from 'app/components/header'
import { Container } from 'app/components/container'

export const metadata = {
    title: 'Technical Test!',
    description: `It's a test!`,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <div className="min-h-screen min-w-screen">
                    <Container>{children}</Container>
                </div>
            </body>
        </html>
    )
}
