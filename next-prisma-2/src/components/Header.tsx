"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { BiSolidDrink } from "react-icons/bi";
import Link from "next/link"


const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="w-full px-4 py-4 fixed flex items-center justify-between">
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
    </div>
  )
}

export default Header