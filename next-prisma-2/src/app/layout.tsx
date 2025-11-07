"use client"
import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "@/SearchContext";
import { Toaster } from "@/components/ui/sonner"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body>
        <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SearchProvider>
        <Header />          
        <main className="pt-20">
            {children}
          </main>
          <Toaster />
          </SearchProvider>
      </ThemeProvider>
      </SessionProvider>
    </body>
    </html >
  )
}

export default Layout
