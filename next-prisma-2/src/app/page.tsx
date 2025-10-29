"use client"

import { Cocktail } from "@/types/types"
import { useState, useEffect, useContext } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from "@/components/ui/spinner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchContext } from "@/SearchContext"

const Page = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }  
  const { searchQuery } = context;

    const fetchCocktails = async (page = 1, query = "") => {
      try {
        const response = await fetch(`/api/cocktail?page=${page}&pageSize=20&search=${query}`)
        const data = await response.json()
        if (page === 1) {
          setCocktails(data)
        } else {
          setCocktails(prev => [...prev, ...data])
        }        
        if (data.length < 20) setHasMore(false)
        setPage(prev => prev + 1)
      } catch (error) {
        throw new Error("Failed to fetch cocktails")
      }
    }

    useEffect(() => {
      setCocktails([])
      setPage(1)
      setHasMore(true)
      fetchCocktails(1, searchQuery)
    }, [searchQuery])

  const filteredCocktails = cocktails.filter(cocktail => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      cocktail.name.toLowerCase().includes(query) ||
      cocktail.ingredients.toLowerCase().includes(query)
    )
  })

  return (
    <InfiniteScroll
    dataLength={cocktails.length}
    next={() => fetchCocktails(page, searchQuery)}
    hasMore={hasMore}
    loader={<div className="flex justify-center py-4"><Spinner /></div>}
  >
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center py-6">
  {filteredCocktails.map((cocktail) => (
    <Card
      key={cocktail.id}
      className="w-full max-w-md mx-auto">

      <CardHeader>
        <CardTitle>{cocktail.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-2 flex-col items-center gap-4">
        {cocktail.imageUrl && (
          <img
            src={cocktail.imageUrl}
            alt={cocktail.name}
            className="w-64 h-64 object-cover rounded-md"
          />
        )}
        <CardDescription>Ingredients</CardDescription>
        <p className="text-center">{cocktail.ingredients}</p>
      </CardContent>

      <CardFooter>
        <Button variant="secondary" className="w-full">
          Add Favorite
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
  </InfiniteScroll> 
  )
}

export default Page