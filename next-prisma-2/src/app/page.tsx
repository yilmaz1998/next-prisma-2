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
import { toast } from "sonner"
import { useSession } from "next-auth/react";

const Page = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const { data: session } = useSession();
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }  
  const { searchQuery } = context;

  const fetchCocktails = async (pageNumber: number, query: string, reset = false) => {
    try {
      const url = query ? 
      `/api/cocktail?search=${query}&page=${pageNumber}` : `/api/cocktail?page=${pageNumber}`;

      const res = await fetch(url);
      const data = await res.json();
  
      if (reset) {
        setCocktails(data);
        setPage(2);
      } else {
        setCocktails(prev => [...prev, ...data]);
        setPage(pageNumber + 1);
      }
      setHasMore(data.length === 20);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchCocktails(1, searchQuery, true);
  }, [searchQuery]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorites");
        const data = await res.json();
  
        setFavorites(data.map((fav: { cocktail: { id: string } }) => fav.cocktail.id));
      } catch (error) {
        console.error(error);
      }
    }
    if (session?.user) {
      fetchFavorites();
    }
  }, [session]);
  

  const filteredCocktails = cocktails;

  const handleFavorite = async (cocktailId: string) => {
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cocktailId }),
      });

      if (!res.ok) {
        toast.warning('Error')
        return
      }
      toast.success("Added to favorites!")
      setFavorites(prev => [...prev, cocktailId])
      } catch (error) {
      console.error(error);
    }
  }

  return (
    <InfiniteScroll
    dataLength={cocktails.length}
    next={() => fetchCocktails(page, searchQuery)}
    hasMore={hasMore}
    loader={<div className="flex justify-center py-4"><Spinner /></div>}
  >
<div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center py-6">
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
      <Button
      variant="secondary"
      onClick={() => handleFavorite(cocktail.id)}
      className="w-full"
      disabled={favorites.includes(cocktail.id)}
      >
      {favorites.includes(cocktail.id) ? "Added" : "Add Favorite"}
     </Button>
      </CardFooter>
    </Card>
  ))}
</div>
  </InfiniteScroll> 
  )
}

export default Page