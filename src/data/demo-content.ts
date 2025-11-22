// Demo data for when TMDB API is not available
import { Movie, TVShow, Person, SportingEvent } from "@/lib/entertainment-api";

export const demoMovies: Movie[] = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    overview:
      "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
    poster_path: "/action-movie-poster.png",
    backdrop_path: "/background.webp",
    release_date: "2022-12-16",
    vote_average: 7.6,
    genre_ids: [878, 12, 14],
    adult: false,
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    overview:
      "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
    poster_path: "/action-movie-poster.png",
    backdrop_path: "/background.webp",
    release_date: "2022-05-27",
    vote_average: 8.3,
    genre_ids: [28, 18],
    adult: false,
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    overview:
      "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death.",
    poster_path: "/action-movie-poster.png",
    backdrop_path: "/background.webp",
    release_date: "2022-11-11",
    vote_average: 7.3,
    genre_ids: [28, 18, 878],
    adult: false,
  },
];

export const demoTVShows: TVShow[] = [
  {
    id: 1,
    name: "House of the Dragon",
    overview:
      "The Targaryen dynasty is at the absolute apex of its power, with more than 10 dragons under their yoke. Most empires crumble from such heights.",
    poster_path: "/drama-series-poster.png",
    backdrop_path: "/background.webp",
    first_air_date: "2022-08-21",
    vote_average: 8.4,
    genre_ids: [18, 10759, 10765],
  },
  {
    id: 2,
    name: "The Bear",
    overview:
      "A young chef from the fine dining world comes home to Chicago to run his family sandwich shop.",
    poster_path: "/comedy-show-thumbnail.jpg",
    backdrop_path: "/background.webp",
    first_air_date: "2022-06-23",
    vote_average: 8.7,
    genre_ids: [35, 18],
  },
  {
    id: 3,
    name: "Stranger Things",
    overview:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    poster_path: "/drama-series-poster.png",
    backdrop_path: "/background.webp",
    first_air_date: "2016-07-15",
    vote_average: 8.7,
    genre_ids: [18, 9648, 10765],
  },
];

export const demoPeople: Person[] = [
  {
    id: 1,
    name: "Zendaya",
    profile_path: "/user-avatar-1.png",
    known_for_department: "Acting",
    popularity: 145.6,
    known_for: [
      {
        id: 1,
        title: "Spider-Man: No Way Home",
        overview: "Spider-Man seeks to restore his secret identity.",
        poster_path: "/action-movie-poster.png",
        backdrop_path: "/background.webp",
        release_date: "2021-12-17",
        vote_average: 8.4,
        genre_ids: [28, 12, 878],
        adult: false,
      },
    ],
  },
  {
    id: 2,
    name: "Ryan Reynolds",
    profile_path: "/diverse-user-avatar-set-2.png",
    known_for_department: "Acting",
    popularity: 98.5,
    known_for: [
      {
        id: 2,
        title: "Deadpool",
        overview:
          "A wisecracking mercenary gets an experimental treatment for cancer.",
        poster_path: "/action-movie-poster.png",
        backdrop_path: "/background.webp",
        release_date: "2016-02-12",
        vote_average: 8.0,
        genre_ids: [28, 35, 878],
        adult: false,
      },
    ],
  },
  {
    id: 3,
    name: "Margot Robbie",
    profile_path: "/diverse-user-avatars-3.png",
    known_for_department: "Acting",
    popularity: 87.3,
    known_for: [
      {
        id: 3,
        title: "Barbie",
        overview:
          "Barbie and Ken are having the time of their lives in the colorful world of Barbie Land.",
        poster_path: "/placeholder.jpg",
        backdrop_path: "/background.webp",
        release_date: "2023-07-21",
        vote_average: 7.2,
        genre_ids: [35, 14],
        adult: false,
      },
    ],
  },
];

export const demoGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

// Extended sports events for demo
export const extendedSportsEvents: SportingEvent[] = [
  {
    id: "1",
    title: "Champions League Final",
    description: "The biggest match in European football",
    date: "2024-06-01",
    time: "21:00",
    teams: ["Real Madrid", "Manchester City"],
    league: "UEFA Champions League",
    image: "/sports-live-broadcast.png",
    status: "upcoming",
  },
  {
    id: "2",
    title: "NBA Finals Game 7",
    description: "Winner takes all in the championship",
    date: "2024-06-15",
    time: "20:00",
    teams: ["Lakers", "Celtics"],
    league: "NBA",
    image: "/sports-live-broadcast.png",
    status: "live",
  },
  {
    id: "3",
    title: "Formula 1 Monaco GP",
    description: "The most prestigious race in F1",
    date: "2024-05-26",
    time: "15:00",
    teams: ["Hamilton", "Verstappen", "Leclerc"],
    league: "Formula 1",
    image: "/sports-live-broadcast.png",
    status: "finished",
  },
  {
    id: "4",
    title: "Premier League: Arsenal vs Liverpool",
    description: "Top of the table clash",
    date: "2024-04-15",
    time: "17:30",
    teams: ["Arsenal", "Liverpool"],
    league: "Premier League",
    image: "/sports-live-broadcast.png",
    status: "upcoming",
  },
  {
    id: "5",
    title: "Tennis: French Open Final",
    description: "Roland Garros Championship",
    date: "2024-06-09",
    time: "15:00",
    teams: ["Djokovic", "Alcaraz"],
    league: "ATP",
    image: "/sports-live-broadcast.png",
    status: "upcoming",
  },
  {
    id: "6",
    title: "NFL: Super Bowl LVIII",
    description: "The biggest game in American football",
    date: "2024-02-11",
    time: "18:30",
    teams: ["49ers", "Chiefs"],
    league: "NFL",
    image: "/sports-live-broadcast.png",
    status: "finished",
  },
];
