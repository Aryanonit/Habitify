import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundAnimation } from "@/components/background-animation"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your habits and achieve your goals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BackgroundAnimation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'