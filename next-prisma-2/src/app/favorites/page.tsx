"use client"

import { Favorite } from '@/types/types'
import { useState, useEffect, useContext } from 'react'
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

const page = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }  
  const { searchQuery } = context;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch favorites")
        }

        const data = await response.json()
        console.log(data)
        setFavorites(data)
      } catch (err) {
        console.error(err)
        setError("Error fetching favorites")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const filteredFavorites = favorites.filter(favorite =>
    favorite.cocktail.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
<div className='p-2'>
    <h1 className="text-3xl text-center m-6">My Favorites</h1>
  {filteredFavorites.length === 0 ? (
    <p className='text-center'>No favorites found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center py-6">
      {filteredFavorites.map((fav) => (
        <Card
          key={fav.cocktail.id}
          className="w-full max-w-md mx-auto"
        >
          <CardHeader>
            <CardTitle>{fav.cocktail.name}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            {fav.cocktail.imageUrl && (
              <img
                src={fav.cocktail.imageUrl}
                alt={fav.cocktail.name}
                className="w-64 h-64 object-cover rounded-md"
              />
            )}
            <CardDescription>Ingredients</CardDescription>
            <p className="text-center">{fav.cocktail.ingredients}</p>
          </CardContent>

          <CardFooter>
            <Button className="w-full" variant='secondary'>Remove</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )}
</div>
  )
}

export default page