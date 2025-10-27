"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { BiSolidDrink } from "react-icons/bi";
import Link from "next/link"
import { useSession, signOut } from "next-auth/react";


const Header = () => {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const username = session?.user?.name

  return (
    <div className="w-full px-4 py-4 fixed flex items-center bg-white dark:bg-black z-50 justify-between">
      <div className="flex items-center">
        <BiSolidDrink className="ml-1 text-2xl" />
        <Link href={"/"}>
        <h1 className="text-2xl">Sipster</h1>
        </Link>
      </div>
      <Button
        variant="outline"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </Button>

      <div className="flex items-center gap-4">
        {username ? (
          <>
            <span>Hello, {username}</span>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header