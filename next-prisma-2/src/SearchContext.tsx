"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type SearchContextType = {
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}
