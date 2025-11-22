// API client for entertainment content with caching and error handling
import {
  demoMovies,
  demoTVShows,
  demoPeople,
  demoGenres,
  extendedSportsEvents,
} from "@/data/demo-content";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  known_for: (Movie | TVShow)[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

class EntertainmentAPIClient {
  private baseURL = "https://api.themoviedb.org/3";
  private apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "demo_key";
  private cache = new Map<string, { data: any; timestamp: number }>();
  private rateLimitDelay = 250; // 4 requests per second
  private lastRequestTime = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private isDemoMode =
    !process.env.NEXT_PUBLIC_TMDB_API_KEY ||
    process.env.NEXT_PUBLIC_TMDB_API_KEY === "demo_key";

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.rateLimitDelay) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.rateLimitDelay - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
  }

  private getCacheKey(url: string): string {
    return btoa(url).replace(/[+/=]/g, "");
  }

  private isValidCache(cacheEntry: { data: any; timestamp: number }): boolean {
    return Date.now() - cacheEntry.timestamp < this.CACHE_DURATION;
  }

  private async fetchWithRetry(url: string, retries = 3): Promise<any> {
    const cacheKey = this.getCacheKey(url);
    const cached = this.cache.get(cacheKey);

    if (cached && this.isValidCache(cached)) {
      return cached.data;
    }

    await this.rateLimit();

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url);

        if (response.status === 429) {
          // Rate limited - exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Cache successful responses
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
        });

        return data;
      } catch (error) {
        if (attempt === retries) {
          console.error(`API request failed after ${retries} attempts:`, error);
          throw error;
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  private buildURL(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.set("api_key", this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });

    return url.toString();
  }

  // Demo data fallbacks
  private createDemoResponse<T>(data: T[], page = 1): APIResponse<T> {
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      page,
      results: paginatedData,
      total_pages: Math.ceil(data.length / itemsPerPage),
      total_results: data.length,
    };
  }

  private searchDemoData<T>(
    data: T[],
    query: string,
    searchFields: (keyof T)[],
    page = 1
  ): APIResponse<T> {
    const filtered = data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
        );
      })
    );

    return this.createDemoResponse(filtered, page);
  }

  // Movies
  async getPopularMovies(page = 1): Promise<APIResponse<Movie>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(demoMovies, page);
    }

    const url = this.buildURL("/movie/popular", { page });
    return this.fetchWithRetry(url);
  }

  async getTopRatedMovies(page = 1): Promise<APIResponse<Movie>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(
        [...demoMovies].sort((a, b) => b.vote_average - a.vote_average),
        page
      );
    }

    const url = this.buildURL("/movie/top_rated", { page });
    return this.fetchWithRetry(url);
  }

  async getNowPlayingMovies(page = 1): Promise<APIResponse<Movie>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(demoMovies, page);
    }

    const url = this.buildURL("/movie/now_playing", { page });
    return this.fetchWithRetry(url);
  }

  async getUpcomingMovies(page = 1): Promise<APIResponse<Movie>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(demoMovies, page);
    }

    const url = this.buildURL("/movie/upcoming", { page });
    return this.fetchWithRetry(url);
  }

  async getMovieVideos(movieId: number): Promise<{ results: VideoResult[] }> {
    if (this.isDemoMode) {
      return {
        results: [
          {
            id: "1",
            key: "dQw4w9WgXcQ",
            name: "Official Trailer",
            site: "YouTube",
            type: "Trailer",
          },
        ],
      };
    }

    const url = this.buildURL(`/movie/${movieId}/videos`);
    return this.fetchWithRetry(url);
  }

  // TV Shows
  async getPopularTVShows(page = 1): Promise<APIResponse<TVShow>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(demoTVShows, page);
    }

    const url = this.buildURL("/tv/popular", { page });
    return this.fetchWithRetry(url);
  }

  async getTopRatedTVShows(page = 1): Promise<APIResponse<TVShow>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(
        [...demoTVShows].sort((a, b) => b.vote_average - a.vote_average),
        page
      );
    }

    const url = this.buildURL("/tv/top_rated", { page });
    return this.fetchWithRetry(url);
  }

  async getAiringTodayTVShows(page = 1): Promise<APIResponse<TVShow>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(demoTVShows, page);
    }

    const url = this.buildURL("/tv/airing_today", { page });
    return this.fetchWithRetry(url);
  }

  async getTVShowVideos(tvId: number): Promise<{ results: VideoResult[] }> {
    if (this.isDemoMode) {
      return {
        results: [
          {
            id: "2",
            key: "dQw4w9WgXcQ",
            name: "Official Trailer",
            site: "YouTube",
            type: "Trailer",
          },
        ],
      };
    }

    const url = this.buildURL(`/tv/${tvId}/videos`);
    return this.fetchWithRetry(url);
  }

  // People
  async getPopularPeople(page = 1): Promise<APIResponse<Person>> {
    if (this.isDemoMode) {
      return this.createDemoResponse(demoPeople, page);
    }

    const url = this.buildURL("/person/popular", { page });
    return this.fetchWithRetry(url);
  }

  // Search
  async searchMulti(
    query: string,
    page = 1
  ): Promise<APIResponse<Movie | TVShow | Person>> {
    if (this.isDemoMode) {
      const allContent = [...demoMovies, ...demoTVShows, ...demoPeople];

      const filtered = allContent.filter((item) => {
        const title = (item as any).title || (item as any).name;
        const overview = (item as any).overview || "";
        return (
          title?.toLowerCase().includes(query.toLowerCase()) ||
          overview?.toLowerCase().includes(query.toLowerCase())
        );
      });

      return this.createDemoResponse(
        filtered as (Movie | TVShow | Person)[],
        page
      );
    }

    const url = this.buildURL("/search/multi", { query, page });
    return this.fetchWithRetry(url);
  }

  async searchMovies(query: string, page = 1): Promise<APIResponse<Movie>> {
    if (this.isDemoMode) {
      return this.searchDemoData(
        demoMovies,
        query,
        ["title", "overview"],
        page
      );
    }

    const url = this.buildURL("/search/movie", { query, page });
    return this.fetchWithRetry(url);
  }

  async searchTVShows(query: string, page = 1): Promise<APIResponse<TVShow>> {
    if (this.isDemoMode) {
      return this.searchDemoData(
        demoTVShows,
        query,
        ["name", "overview"],
        page
      );
    }

    const url = this.buildURL("/search/tv", { query, page });
    return this.fetchWithRetry(url);
  }

  async searchPeople(query: string, page = 1): Promise<APIResponse<Person>> {
    if (this.isDemoMode) {
      return this.searchDemoData(demoPeople, query, ["name"], page);
    }

    const url = this.buildURL("/search/person", { query, page });
    return this.fetchWithRetry(url);
  }

  // Genres
  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    if (this.isDemoMode) {
      return { genres: demoGenres };
    }

    const url = this.buildURL("/genre/movie/list");
    return this.fetchWithRetry(url);
  }

  async getTVGenres(): Promise<{ genres: Genre[] }> {
    if (this.isDemoMode) {
      return { genres: demoGenres };
    }

    const url = this.buildURL("/genre/tv/list");
    return this.fetchWithRetry(url);
  }

  // Discover with filters
  async discoverMovies(
    params: {
      page?: number;
      genre?: string;
      year?: number;
      sort_by?: string;
      vote_average_gte?: number;
    } = {}
  ): Promise<APIResponse<Movie>> {
    if (this.isDemoMode) {
      let filtered = [...demoMovies];

      if (params.genre) {
        const genreId = parseInt(params.genre);
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(genreId)
        );
      }

      if (params.year) {
        filtered = filtered.filter(
          (movie) => new Date(movie.release_date).getFullYear() === params.year
        );
      }

      if (params.vote_average_gte) {
        filtered = filtered.filter(
          (movie) => movie.vote_average >= params.vote_average_gte!
        );
      }

      if (params.sort_by) {
        if (params.sort_by === "vote_average.desc") {
          filtered.sort((a, b) => b.vote_average - a.vote_average);
        } else if (params.sort_by === "release_date.desc") {
          filtered.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
        } else if (params.sort_by === "title.asc") {
          filtered.sort((a, b) => a.title.localeCompare(b.title));
        }
      }

      return this.createDemoResponse(filtered, params.page || 1);
    }

    const url = this.buildURL("/discover/movie", params);
    return this.fetchWithRetry(url);
  }

  async discoverTVShows(
    params: {
      page?: number;
      genre?: string;
      first_air_date_year?: number;
      sort_by?: string;
      vote_average_gte?: number;
    } = {}
  ): Promise<APIResponse<TVShow>> {
    if (this.isDemoMode) {
      let filtered = [...demoTVShows];

      if (params.genre) {
        const genreId = parseInt(params.genre);
        filtered = filtered.filter((show) => show.genre_ids.includes(genreId));
      }

      if (params.first_air_date_year) {
        filtered = filtered.filter(
          (show) =>
            new Date(show.first_air_date).getFullYear() ===
            params.first_air_date_year
        );
      }

      if (params.vote_average_gte) {
        filtered = filtered.filter(
          (show) => show.vote_average >= params.vote_average_gte!
        );
      }

      if (params.sort_by) {
        if (params.sort_by === "vote_average.desc") {
          filtered.sort((a, b) => b.vote_average - a.vote_average);
        } else if (params.sort_by === "first_air_date.desc") {
          filtered.sort(
            (a, b) =>
              new Date(b.first_air_date).getTime() -
              new Date(a.first_air_date).getTime()
          );
        } else if (params.sort_by === "name.asc") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
      }

      return this.createDemoResponse(filtered, params.page || 1);
    }

    const url = this.buildURL("/discover/tv", params);
    return this.fetchWithRetry(url);
  }

  // Utility methods
  getImageURL(
    path: string | null,
    size:
      | "w92"
      | "w154"
      | "w185"
      | "w342"
      | "w500"
      | "w780"
      | "original" = "w500"
  ): string | null {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  isDemoModeActive(): boolean {
    return this.isDemoMode;
  }
}

// Create singleton instance
export const apiClient = new EntertainmentAPIClient();

// Export sports events using the extended demo data
export const mockSportsEvents: SportingEvent[] = extendedSportsEvents;
