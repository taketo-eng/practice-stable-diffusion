import { Header } from "@/components/Header/Header"
import "./globals.scss"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Stable Diffusion Practice App",
    description: "This is sample app.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-800`}>
                <Header />
                <main className="mt-14 py-10">{children}</main>
            </body>
        </html>
    )
}
