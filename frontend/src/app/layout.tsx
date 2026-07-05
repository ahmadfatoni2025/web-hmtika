import type { Metadata } from "next"
import "@/styles/globals.css"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "HMTIKA STIMIK Tunas Bangsa",
  description:
    "Portal resmi Himpunan Mahasiswa Teknik Informatika STIMIK Tunas Bangsa",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="antialiased">
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
