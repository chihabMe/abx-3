import { Star, Calendar, Clock, MapPin, Play, Tv, Trophy } from "lucide-react";
import Image from "next/image";

// Types
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

interface SportsLeague {
  league: string;
  country: string;
  date: string;
  time: string;
  leagueLogo: string;
  leagueId?: number;
}

// Server action to fetch TMDB data
async function fetchTMDBContent() {
  const API_KEY = process.env.TMDB_KEY;

  if (!API_KEY) {
    throw new Error(
      "API key not found. Please set NEXT_PUBLIC_TMDB_KEY environment variable."
    );
  }

  try {
    const [moviesResponse, tvResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        { cache: "force-cache", next: { revalidate: 3600 } }
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
        { cache: "force-cache", next: { revalidate: 3600 } }
      ),
    ]);

    if (!moviesResponse.ok || !tvResponse.ok) {
      throw new Error("Failed to fetch data from TMDB");
    }

    const [moviesData, tvData] = await Promise.all([
      moviesResponse.json(),
      tvResponse.json(),
    ]);

    return {
      movies: moviesData.results.slice(0, 10) as Movie[],
      tvShows: tvData.results.slice(0, 10) as TVShow[],
    };
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    throw error;
  }
}

// Server action to fetch Football Leagues data
async function fetchFootballLeagues() {
  const API_KEY = process.env.API_FOOTBALL_KEY;

  if (!API_KEY) {
    console.warn("API-Football key not found. Using fallback data.");
    return [];
  }

  try {
    // Fetch major European leagues
    const leagueIds = [
      2, // UEFA Champions League
      3, // UEFA Europa League
      848, // UEFA Conference League
      5, // UEFA Nations League
      4, // Euro Championship
      39, // Premier League
      40, // Championship
      45, // FA Cup
      48, // League Cup
      140, // La Liga
      141, // Segunda División
      143, // Copa del Rey
      556, // Supercopa de España
      61, // Ligue 1
      62, // Ligue 2
      66, // Coupe de France
      137, // Trophée des Champions
      135, // Serie A
      136, // Serie B
      137, // Coppa Italia
      78, // Bundesliga
      79, // 2. Bundesliga
      81, // DFB-Pokal
    ];

    const response = await fetch(
      `https://v3.football.api-sports.io/leagues?current=true`,
      {
        headers: {
          "x-apisports-key": API_KEY,
        },
        cache: "force-cache",
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API-Football");
    }

    const data = await response.json();

    // Filter and map the leagues we want
    const leagues = data.response
      .filter((item: any) => leagueIds.includes(item.league.id))
      .map((item: any) => ({
        league: item.league.name,
        country: item.country.name,
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // Random date in next 30 days
        time: `${Math.floor(Math.random() * 5) + 18}:${["00", "15", "30", "45"][Math.floor(Math.random() * 4)]}`,
        leagueLogo: item.league.logo,
        leagueId: item.league.id,
      }));

    return leagues as SportsLeague[];
  } catch (error) {
    console.error("Error fetching API-Football data:", error);
    return [];
  }
}

export default async function ContentShowcase() {
  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  // Fetch content on server
  let movies: Movie[] = [];
  let tvShows: TVShow[] = [];
  let sportsLeagues: SportsLeague[] = [];
  let error: string | null = null;

  try {
    const [tmdbData, footballData] = await Promise.all([
      fetchTMDBContent(),
      fetchFootballLeagues(),
    ]);

    movies = tmdbData.movies;
    tvShows = tmdbData.tvShows;
    sportsLeagues = footballData;

    // Fallback to static data if API fails
    if (sportsLeagues.length === 0) {
      sportsLeagues = [
        {
          league: "UEFA Champions League",
          country: "Europe",
          date: "2025-11-22",
          time: "20:45",
          leagueLogo: "/leags/ch-leage.jpeg",
        },
        {
          league: "UEFA Europa League",
          country: "Europe",
          date: "2025-11-23",
          time: "21:00",
          leagueLogo: "/leags/uefa.png",
        },
        {
          league: "Premier League",
          country: "England",
          date: "2025-11-27",
          time: "15:00",
          leagueLogo: "/leags/uwfa-leage.png",
        },
      ];
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  // Movie Card Component
  const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="group relative bg-card/40 backdrop-blur-sm border border-accent/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-w-[220px] w-[220px] h-[350px]">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      <div className="relative h-full">
        <Image
          src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
          alt="Content poster"
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={12} fill="currentColor" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Play size={20} className="text-white ml-0.5" />
        </div>
      </div>
    </div>
  );

  // TV Show Card Component
  const TVCard = ({ show }: { show: TVShow }) => (
    <div className="group relative bg-card/40 backdrop-blur-sm border border-accent/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-w-[220px] w-[220px] h-[350px]">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      <div className="relative h-full">
        <Image
          src={`${TMDB_IMAGE_BASE}${show.poster_path}`}
          alt="Content poster"
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={12} fill="currentColor" />
              <span>{show.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">
              {new Date(show.first_air_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Tv size={20} className="text-white" />
        </div>
      </div>
    </div>
  );

  // Sports League Card Component
  const SportsCard = ({ league }: { league: SportsLeague }) => (
    <div className="group relative bg-card/40 backdrop-blur-sm border border-accent/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-w-[220px] w-[220px] h-[350px]">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      <div className="relative h-full">
        <Image
          src={league.leagueLogo}
          alt={league.league}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white line-clamp-2">
            {league.league}
          </h3>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-green-400">
              <MapPin size={12} />
              <span>{league.country}</span>
            </div>
            <span className="text-gray-300">{league.time}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Calendar size={12} />
            <span>{new Date(league.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Trophy size={20} className="text-white" />
        </div>
      </div>
    </div>
  );

  // Loading Component - not needed for server component but keeping for potential future use
  const LoadingCard = () => (
    <div className="min-w-[220px] w-[220px] h-[350px] bg-card/20 rounded-2xl animate-pulse" />
  );

  // Error Component
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-background/95 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Error Loading Content
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="w-6 h-6 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Contenu Premium
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-purple-400 bg-clip-text text-transparent">
            Contenu Premium
            <br />
            <span className="text-3xl md:text-4xl">en streaming illimité</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez notre vaste collection de contenus en streaming.
          </p>
        </div>

        {/* Sports Leagues Section */}
        {/* <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
              <Trophy size={16} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Ligues Européennes
            </h3>
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {sportsLeagues.map((league, index) => (
                <SportsCard key={index} league={league} />
              ))}
            </div>
          </div>
        </div> */}

        {/* Movies Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <Play size={16} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Contenu Populaire
            </h3>
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>

        {/* TV Shows Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
              <Tv size={16} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Nouveautés</h3>
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {tvShows.map((show) => (
                <TVCard key={show.id} show={show} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "10K+",
                label: "Contenus Disponibles",
                color: "text-red-400",
              },
              {
                number: "500+",
                label: "Chaînes Live",
                color: "text-purple-400",
              },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
