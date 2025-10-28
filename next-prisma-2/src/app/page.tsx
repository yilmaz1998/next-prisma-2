"use client"

import { Cocktail } from "@/types/types"
import { useState, useEffect } from "react"
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
    loader={<div className="w-full flex justify-center py-4">
    <Spinner />
  </div>}
  >
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center py-6">
  {cocktails.map((cocktail) => (
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