"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { SearchContextProps } from "./types/types"


export const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}
