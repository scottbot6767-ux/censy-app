import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Censy — Win/Loss Intelligence',
  description: 'Automated win/loss and product feedback analysis for B2B sales teams.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider defaultTheme="light" storageKey="censy-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
