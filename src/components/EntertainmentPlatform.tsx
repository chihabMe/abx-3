"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Calendar,
  Play,
  Users,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  apiClient,
  Movie,
  TVShow,
  Person,
  Genre,
  SportingEvent,
  mockSportsEvents,
  type APIResponse,
} from "@/lib/entertainment-api";

type ContentType = "movies" | "tv" | "people" | "sports" | "all";
type ViewMode = "grid" | "list";
type SortOption = "popularity" | "rating" | "date" | "title";

interface Filters {
  genre: string;
  year: string;
  rating: string;
  sortBy: SortOption;
}

export default function EntertainmentPlatform() {
  // State management
  const [activeTab, setActiveTab] = useState<ContentType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Content state
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [sports] = useState<SportingEvent[]>(mockSportsEvents);
  const [genres, setGenres] = useState<Genre[]>([]);

  // Pagination state
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Filters
  const [filters, setFilters] = useState<Filters>({
    genre: "",
    year: "",
    rating: "",
    sortBy: "popularity",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Load genres
        const [movieGenres, tvGenres] = await Promise.all([
          apiClient.getMovieGenres(),
          apiClient.getTVGenres(),
        ]);

        const allGenres = [
          ...movieGenres.genres,
          ...tvGenres.genres.filter(
            (tvGenre) =>
              !movieGenres.genres.some(
                (movieGenre) => movieGenre.id === tvGenre.id
              )
          ),
        ];
        setGenres(allGenres);

        // Load initial content
        await loadContent();
      } catch (err) {
        setError("Failed to load initial data. Using demo content.");
        console.error("Initial load error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load content based on current tab and filters
  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (searchQuery.trim()) {
        await performSearch();
        return;
      }

      const promises: Promise<APIResponse<any>>[] = [];

      if (activeTab === "all" || activeTab === "movies") {
        promises.push(
          filters.genre || filters.year || filters.rating
            ? apiClient.discoverMovies({
                page: currentPage,
                genre: filters.genre,
                year: filters.year ? parseInt(filters.year) : undefined,
                vote_average_gte: filters.rating
                  ? parseFloat(filters.rating)
                  : undefined,
                sort_by: getSortValue("movie", filters.sortBy),
              })
            : apiClient.getPopularMovies(currentPage)
        );
      }

      if (activeTab === "all" || activeTab === "tv") {
        promises.push(
          filters.genre || filters.year || filters.rating
            ? apiClient.discoverTVShows({
                page: currentPage,
                genre: filters.genre,
                first_air_date_year: filters.year
                  ? parseInt(filters.year)
                  : undefined,
                vote_average_gte: filters.rating
                  ? parseFloat(filters.rating)
                  : undefined,
                sort_by: getSortValue("tv", filters.sortBy),
              })
            : apiClient.getPopularTVShows(currentPage)
        );
      }

      if (activeTab === "all" || activeTab === "people") {
        promises.push(apiClient.getPopularPeople(currentPage));
      }

      const results = await Promise.allSettled(promises);

      let movieResults: Movie[] = [];
      let tvResults: TVShow[] = [];
      let peopleResults: Person[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const data = result.value;
          if (activeTab === "all") {
            if (index === 0) movieResults = data.results.slice(0, 6);
            else if (index === 1) tvResults = data.results.slice(0, 6);
            else if (index === 2) peopleResults = data.results.slice(0, 6);
          } else {
            if (activeTab === "movies") movieResults = data.results;
            else if (activeTab === "tv") tvResults = data.results;
            else if (activeTab === "people") peopleResults = data.results;

            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
          }
        }
      });

      setMovies(movieResults);
      setTVShows(tvResults);
      setPeople(peopleResults);
    } catch (err) {
      setError("Failed to load content. Please try again.");
      console.error("Content load error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, currentPage, searchQuery, filters]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (activeTab === "all") {
        const results = await apiClient.searchMulti(searchQuery, currentPage);
        const movieResults: Movie[] = [];
        const tvResults: TVShow[] = [];
        const peopleResults: Person[] = [];

        results.results.forEach((item) => {
          if (item.hasOwnProperty("title")) movieResults.push(item as Movie);
          else if (
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("first_air_date")
          )
            tvResults.push(item as TVShow);
          else if (item.hasOwnProperty("known_for_department"))
            peopleResults.push(item as Person);
        });

        setMovies(movieResults);
        setTVShows(tvResults);
        setPeople(peopleResults);
        setTotalPages(results.total_pages);
        setTotalResults(results.total_results);
      } else {
        let results;
        if (activeTab === "movies") {
          results = await apiClient.searchMovies(searchQuery, currentPage);
          setMovies(results.results);
        } else if (activeTab === "tv") {
          results = await apiClient.searchTVShows(searchQuery, currentPage);
          setTVShows(results.results);
        } else if (activeTab === "people") {
          results = await apiClient.searchPeople(searchQuery, currentPage);
          setPeople(results.results);
        } else if (activeTab === "sports") {
          const filtered = sports.filter(
            (event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              event.league.toLowerCase().includes(searchQuery.toLowerCase())
          );
          // For sports, we don't set the main state since it's handled separately
        }

        if (results) {
          setTotalPages(results.total_pages);
          setTotalResults(results.total_results);
        }
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Search error:", err);
    }
  };

  const getSortValue = (type: "movie" | "tv", sortBy: SortOption): string => {
    const sortMap = {
      movie: {
        popularity: "popularity.desc",
        rating: "vote_average.desc",
        date: "release_date.desc",
        title: "title.asc",
      },
      tv: {
        popularity: "popularity.desc",
        rating: "vote_average.desc",
        date: "first_air_date.desc",
        title: "name.asc",
      },
    };

    return sortMap[type][sortBy];
  };

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadContent();
  };

  const handleTabChange = (tab: ContentType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery("");
    setFilters((prev) => ({ ...prev, genre: "", year: "", rating: "" }));
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Load content when dependencies change
  useEffect(() => {
    if (activeTab !== "sports") {
      loadContent();
    }
  }, [loadContent]);

  // Filtered sports for search
  const filteredSports = useMemo(() => {
    if (!searchQuery) return sports;
    return sports.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.teams.some((team) =>
          team.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [sports, searchQuery]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, i) => currentYear - i);
  }, []);

  const ratings = ["9", "8", "7", "6", "5"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Plateforme Entertainment Abonix Frane
              </h1>
              <p className="text-muted-foreground mt-2">
                Films, Séries, Célébrités et Sport en Direct
              </p>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher films, séries, stars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                </Button>

                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card/50 rounded-lg border border-border">
                <Select
                  value={filters.genre}
                  onValueChange={(value) => handleFilterChange("genre", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.year}
                  onValueChange={(value) => handleFilterChange("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les années</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.rating}
                  onValueChange={(value) => handleFilterChange("rating", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Note min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les notes</SelectItem>
                    {ratings.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}+ ⭐
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortBy}
                  onValueChange={(value) =>
                    handleFilterChange("sortBy", value as SortOption)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularité</SelectItem>
                    <SelectItem value="rating">Note</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="title">Titre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange as any}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all" className="gap-2">
              <Grid className="w-4 h-4" />
              Tout
            </TabsTrigger>
            <TabsTrigger value="movies" className="gap-2">
              <Play className="w-4 h-4" />
              Films
            </TabsTrigger>
            <TabsTrigger value="tv" className="gap-2">
              <Calendar className="w-4 h-4" />
              Séries
            </TabsTrigger>
            <TabsTrigger value="people" className="gap-2">
              <Users className="w-4 h-4" />
              Stars
            </TabsTrigger>
            <TabsTrigger value="sports" className="gap-2">
              <Trophy className="w-4 h-4" />
              Sport
            </TabsTrigger>
          </TabsList>

          {/* Loading and Error States */}
          {error && (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">{error}</div>
              <Button onClick={() => loadContent()}>Réessayer</Button>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-muted-foreground">
                Chargement du contenu...
              </p>
            </div>
          )}

          {/* Content Sections */}
          <TabsContent value="all" className="space-y-12">
            {!isLoading && !error && (
              <>
                {movies.length > 0 && (
                  <ContentSection
                    title="Films Populaires"
                    items={movies}
                    type="movie"
                    viewMode={viewMode}
                  />
                )}

                {tvShows.length > 0 && (
                  <ContentSection
                    title="Séries Tendance"
                    items={tvShows}
                    type="tv"
                    viewMode={viewMode}
                  />
                )}

                {people.length > 0 && (
                  <ContentSection
                    title="Stars du Moment"
                    items={people}
                    type="person"
                    viewMode={viewMode}
                  />
                )}

                <ContentSection
                  title="Sport en Direct"
                  items={filteredSports}
                  type="sports"
                  viewMode={viewMode}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="movies">
            {!isLoading && !error && (
              <ContentSection
                title={
                  searchQuery ? `Résultats pour "${searchQuery}"` : "Films"
                }
                items={movies}
                type="movie"
                viewMode={viewMode}
                showPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>

          <TabsContent value="tv">
            {!isLoading && !error && (
              <ContentSection
                title={
                  searchQuery ? `Résultats pour "${searchQuery}"` : "Séries TV"
                }
                items={tvShows}
                type="tv"
                viewMode={viewMode}
                showPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>

          <TabsContent value="people">
            {!isLoading && !error && (
              <ContentSection
                title={
                  searchQuery ? `Résultats pour "${searchQuery}"` : "Célébrités"
                }
                items={people}
                type="person"
                viewMode={viewMode}
                showPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>

          <TabsContent value="sports">
            <ContentSection
              title={
                searchQuery
                  ? `Résultats pour "${searchQuery}"`
                  : "Événements Sportifs"
              }
              items={filteredSports}
              type="sports"
              viewMode={viewMode}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Content Section Component
interface ContentSectionProps {
  title: string;
  items: any[];
  type: "movie" | "tv" | "person" | "sports";
  viewMode: ViewMode;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalResults?: number;
  onPageChange?: (page: number) => void;
}

function ContentSection({
  title,
  items,
  type,
  viewMode,
  showPagination,
  currentPage = 1,
  totalPages = 1,
  totalResults = 0,
  onPageChange,
}: ContentSectionProps) {
  if (!items.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun contenu trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showPagination && totalResults > 0 && (
          <span className="text-sm text-muted-foreground">
            {totalResults.toLocaleString()} résultats
          </span>
        )}
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            : "space-y-4"
        }
      >
        {items.map((item, index) => (
          <ContentCard
            key={`${type}-${item.id || index}`}
            item={item}
            type={type}
            viewMode={viewMode}
          />
        ))}
      </div>

      {showPagination && totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

// Content Card Component
interface ContentCardProps {
  item: any;
  type: "movie" | "tv" | "person" | "sports";
  viewMode: ViewMode;
}

function ContentCard({ item, type, viewMode }: ContentCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayTrailer = async () => {
    if (type === "movie" || type === "tv") {
      setIsLoading(true);
      try {
        const videos =
          type === "movie"
            ? await apiClient.getMovieVideos(item.id)
            : await apiClient.getTVShowVideos(item.id);

        const trailer = videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          window.open(
            `https://www.youtube.com/watch?v=${trailer.key}`,
            "_blank"
          );
        } else {
          alert("Aucune bande-annonce disponible");
        }
      } catch (error) {
        alert("Erreur lors du chargement de la bande-annonce");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (viewMode === "list") {
    return (
      <Card className="flex flex-row overflow-hidden hover:shadow-lg transition-shadow">
        <div className="w-32 flex-shrink-0">
          <img
            src={getImageSrc(item, type)}
            alt={getTitle(item, type)}
            className="w-full h-32 object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                {getTitle(item, type)}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {getDescription(item, type)}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {getDate(item, type) && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {getDate(item, type)}
                  </span>
                )}
                {getRating(item, type) && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {getRating(item, type)}
                  </span>
                )}
              </div>
            </div>
            {(type === "movie" || type === "tv") && (
              <Button
                size="sm"
                variant="outline"
                onClick={handlePlayTrailer}
                disabled={isLoading}
                className="ml-4"
              >
                {isLoading ? "..." : <Play className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageSrc(item, type)}
          alt={getTitle(item, type)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {(type === "movie" || type === "tv") && (
          <Button
            size="sm"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handlePlayTrailer}
            disabled={isLoading}
          >
            {isLoading ? (
              "..."
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Trailer
              </>
            )}
          </Button>
        )}

        {getRating(item, type) && (
          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {getRating(item, type)}
          </Badge>
        )}

        {type === "sports" && (
          <Badge
            className={`absolute top-2 left-2 ${
              item.status === "live"
                ? "bg-red-500"
                : item.status === "upcoming"
                  ? "bg-blue-500"
                  : "bg-gray-500"
            } text-white`}
          >
            {item.status === "live"
              ? "🔴 LIVE"
              : item.status === "upcoming"
                ? "📅 À venir"
                : "✓ Terminé"}
          </Badge>
        )}
      </div>

      <CardHeader className="p-4">
        <CardTitle className="text-sm line-clamp-2 min-h-[2.5rem]">
          {getTitle(item, type)}
        </CardTitle>
        {getDate(item, type) && (
          <p className="text-xs text-muted-foreground">{getDate(item, type)}</p>
        )}
        {type === "sports" && item.teams && (
          <p className="text-xs text-muted-foreground">
            {item.teams.join(" vs ")}
          </p>
        )}
      </CardHeader>
    </Card>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page !== "number"}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Helper functions
function getImageSrc(item: any, type: string): string {
  if (type === "person") {
    return item.profile_path
      ? apiClient.getImageURL(item.profile_path, "w342") ||
          "/placeholder-user.jpg"
      : "/placeholder-user.jpg";
  }

  if (type === "sports") {
    return item.image || "/sports-live-broadcast.png";
  }

  return item.poster_path
    ? apiClient.getImageURL(item.poster_path, "w342") || "/placeholder.jpg"
    : "/placeholder.jpg";
}

function getTitle(item: any, type: string): string {
  if (type === "person") return item.name || "Unknown";
  if (type === "sports") return item.title || "Sporting Event";
  if (type === "tv") return item.name || "Unknown Show";
  return item.title || "Unknown Movie";
}

function getDescription(item: any, type: string): string {
  if (type === "person") {
    return `${item.known_for_department || "Entertainment"} - Popularité: ${item.popularity?.toFixed(1) || "N/A"}`;
  }
  if (type === "sports") {
    return (
      item.description ||
      `${item.league} - ${item.teams?.join(" vs ") || "Event"}`
    );
  }
  return item.overview || "Aucune description disponible";
}

function getDate(item: any, type: string): string | null {
  if (type === "sports") {
    return item.date ? new Date(item.date).toLocaleDateString("fr-FR") : null;
  }

  const date = item.release_date || item.first_air_date;
  return date ? new Date(date).toLocaleDateString("fr-FR") : null;
}

function getRating(item: any, type: string): string | null {
  if (type === "person" || type === "sports") return null;
  return item.vote_average ? item.vote_average.toFixed(1) : null;
}
