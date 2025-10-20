import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header/> 
          <main className="pt-20">
            {children}
          </main>
      </ThemeProvider>
    </body>
    </html >
  )
}

export default Layout
