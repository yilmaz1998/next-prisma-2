"use client"

import { Cocktail } from "@/types/types"
import { useState, useEffect } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'


const Page = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

    const fetchCocktails = async () => {
      try {
        const response = await fetch(`/api/cocktail?page=${page}&pageSize=20`)
        const data = await response.json()
        setCocktails(prev => [...prev, ...data])
        if (data.length < 20) setHasMore(false)
        setPage(prev => prev + 1)
      } catch (error) {
        throw new Error("Failed to fetch cocktails")
      }
    }

  useEffect(() => {
    fetchCocktails()
  }, [])

  return (
    <InfiniteScroll
    dataLength={cocktails.length}
    next={fetchCocktails}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
  >
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
  </InfiniteScroll> 
  )
}

export default Page