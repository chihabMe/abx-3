
import type { Content, Event } from "@/types"

export const featuredContent: Content[] = [
  {
    id: 1,
    title: "Terminal",
    image: "/placeholder.svg?height=120&width=200",
    category: "Movies",
    rating: "4.7",
  },
  {
    id: 2,
    title: "Stranger",
    image: "/placeholder.svg?height=120&width=200",
    category: "Series",
    rating: "4.8",
  },
  {
    id: 3,
    title: "Nova",
    image: "/placeholder.svg?height=120&width=200",
    category: "Documentary",
    rating: "4.5",
  },
  {
    id: 4,
    title: "Assembly",
    image: "/placeholder.svg?height=120&width=200",
    category: "Series",
    rating: "4.9",
  },
  {
    id: 5,
    title: "Horizon",
    image: "/placeholder.svg?height=120&width=200",
    category: "Documentary",
    rating: "4.6",
  },
]

export const popularContent: Content[] = [
  {
    id: 6,
    title: "The Last Stand",
    image: "/placeholder.svg?height=300&width=200",
    category: "Action",
    rating: "4.5",
  },
  {
    id: 7,
    title: "Dark Waters",
    image: "/placeholder.svg?height=300&width=200",
    category: "Thriller",
    rating: "4.7",
  },
  {
    id: 8,
    title: "Eternal Sunshine",
    image: "/placeholder.svg?height=300&width=200",
    category: "Drama",
    rating: "4.9",
  },
  {
    id: 9,
    title: "The Heist",
    image: "/placeholder.svg?height=300&width=200",
    category: "Crime",
    rating: "4.6",
  },
]

export const sportsEvents: Event[] = [
  {
    id: 10,
    title: "Premier League: Arsenal vs Liverpool",
    image: "/placeholder.svg?height=120&width=200",
    description: "Watch the exciting match between Arsenal and Liverpool in the Premier League.",
    date: "Today, 8:00 PM",
    live: true,
  },
  {
    id: 11,
    title: "NBA: Lakers vs Warriors",
    image: "/placeholder.svg?height=120&width=200",
    description: "Don't miss the clash between the Lakers and Warriors in this NBA regular season game.",
    date: "Tomorrow, 7:30 PM",
    live: false,
  },
  {
    id: 12,
    title: "Formula 1: Monaco Grand Prix",
    image: "/placeholder.svg?height=120&width=200",
    description: "Experience the thrill of the Monaco Grand Prix, one of the most prestigious races in F1.",
    date: "Sunday, 2:00 PM",
    live: false,
  },
]

// Channel data
export const entertainmentChannels: Content[] = [
  { id: 101, title: "HBO", image: "/placeholder.svg?height=120&width=200", category: "Movies", rating: "4.8" },
  {
    id: 102,
    title: "Netflix",
    image: "/placeholder.svg?height=120&width=200",
    category: "Movies & Series",
    rating: "4.9",
  },
  { id: 103, title: "Disney+", image: "/placeholder.svg?height=120&width=200", category: "Family", rating: "4.7" },
  { id: 104, title: "AMC", image: "/placeholder.svg?height=120&width=200", category: "Movies", rating: "4.5" },
  {
    id: 105,
    title: "Showtime",
    image: "/placeholder.svg?height=120&width=200",
    category: "Movies & Series",
    rating: "4.6",
  },
]

export const sportsChannels: Content[] = [
  { id: 201, title: "ESPN", image: "/placeholder.svg?height=120&width=200", category: "Sports", rating: "4.7" },
  { id: 202, title: "Sky Sports", image: "/placeholder.svg?height=120&width=200", category: "Sports", rating: "4.6" },
  { id: 203, title: "beIN Sports", image: "/placeholder.svg?height=120&width=200", category: "Sports", rating: "4.5" },
  { id: 204, title: "Fox Sports", image: "/placeholder.svg?height=120&width=200", category: "Sports", rating: "4.4" },
  { id: 205, title: "NBA TV", image: "/placeholder.svg?height=120&width=200", category: "Basketball", rating: "4.8" },
]

export const newsChannels: Content[] = [
  { id: 301, title: "CNN", image: "/placeholder.svg?height=120&width=200", category: "News", rating: "4.3" },
  { id: 302, title: "BBC News", image: "/placeholder.svg?height=120&width=200", category: "News", rating: "4.5" },
  { id: 303, title: "Al Jazeera", image: "/placeholder.svg?height=120&width=200", category: "News", rating: "4.2" },
  { id: 304, title: "Fox News", image: "/placeholder.svg?height=120&width=200", category: "News", rating: "4.0" },
  { id: 305, title: "MSNBC", image: "/placeholder.svg?height=120&width=200", category: "News", rating: "4.1" },
]
