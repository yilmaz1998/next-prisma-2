"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { BiSolidDrink } from "react-icons/bi";
import { FiMenu } from "react-icons/fi"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { useState, useContext } from "react";
import { SearchContext } from "@/SearchContext";


const Header = () => {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const username = session?.user?.name
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }  
  const { searchQuery, setSearchQuery } = context;
  const [sideBarOpen, setSideBarOpen] = useState(false)

  const toggleSidebar = () => {
    setSideBarOpen(!sideBarOpen)
}

  return (
    <div className="w-full px-4 py-4 fixed flex items-center bg-white dark:bg-black z-50 justify-between">
      <div className="flex items-center">
        <BiSolidDrink className="ml-1 text-2xl" />
        <Link href={"/"}>
        <h1 className="text-2xl">Sipster</h1>
        </Link>
      </div>

      <Input className="w-2/3" type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <Button onClick={toggleSidebar} >
        <FiMenu className='text-2xl hover:text-gray-200' />
      </Button> 

      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-84 bg-white dark:bg-black text-black dark:text-white transform ${sideBarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-500 z-40`}
      >
        <div className="mt-12 flex flex-col px-8 text-center space-y-5 text-2xl">
        <Button
        variant="outline"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center mb-4"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </Button>
          {username ? (
            <>
              <span className="mt-4 light:text-black ">Hello, {username}</span>
              <Link onClick={() => setSideBarOpen(false)} href={"/favorites"}>My Favorites</Link>
              <Button className="mt-2"   onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button onClick={() => setSideBarOpen(false)} className="mt-4">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header