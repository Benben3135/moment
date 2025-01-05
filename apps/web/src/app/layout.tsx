import { Footer } from '@/components/shared/Footer'
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer/>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}