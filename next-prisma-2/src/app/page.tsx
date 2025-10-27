"use client"

import { Cocktail } from "@/types/types"
import { useState, useEffect } from "react"


const Page = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch("/api/cocktail")
        const data = await response.json()
        setCocktails(data)
      } catch (error) {
        throw new Error("Failed to fetch cocktails")
      }
    }

    fetchCocktails()
  }, [])

  return (
    <div>
      {cocktails.map((cocktail) => (
        <div key={cocktail.id}>
          <h2>{cocktail.name}</h2>
          {cocktail.imageUrl && (
            <img
              src={cocktail.imageUrl}
              alt={cocktail.name}
              className="w-48 h-48 object-cover"
            />
          )}
          <p>{cocktail.ingredients}</p>
        </div>
      ))}
    </div>
  )
}

export default Page