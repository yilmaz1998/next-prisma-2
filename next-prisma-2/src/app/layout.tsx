import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes"


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        </body>
    </html>
  )
}

export default Layout
