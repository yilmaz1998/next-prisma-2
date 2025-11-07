"use client"

import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import { Favorite } from '@/types/types'
import { useState, useEffect } from 'react'

const page = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="p-4">
      <h1 className="text-xl">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((fav) => (
            <li key={fav.id}>
              {fav.cocktail.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default page