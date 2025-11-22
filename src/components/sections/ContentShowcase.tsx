import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import SportEvents from "./ContentShowCase/SportEvents";
import * as motion from "motion/react-m";

// Movie + TV interfaces
export interface TopRatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjE4NzE4YTM1ZGY1NDExNjkxMWZmZjk3MmJjMDk4ZCIsIm5iZiI6MTYyMTk3MzQzMC4xNjgsInN1YiI6IjYwYWQ1OWI2ZmNlYzJlMDA3OTNkNmQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NGMKU3fb0QRQS55iFpeuf6jqrClvdNrn7K49qPwy2rU";

const BASE_URL = "https://api.themoviedb.org/3";

export const getTopRatedMovies = async (): Promise<TopRatedMoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?language=fr-FR&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  return await response.json();
};

export const getTopRatedTVShows = async (): Promise<TopRatedMoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?language=fr-FR&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch TV shows: ${response.statusText}`);
  }
  return await response.json();
};

const ContentShowcase = async () => {
  const movies = await getTopRatedMovies();
  const tvShows = await getTopRatedTVShows();

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0055A4]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#0066CC]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mt-20 relative z-10">
        <SportEvents />
      </div>

      <div className="max-w-screen-3xl mx-auto px-4 md:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
              Regardez vos films, séries TV et chaînes
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0055A4] via-[#0066CC] to-[#0055A4] bg-clip-text text-transparent">
              en direct
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "10%" }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-[#0055A4] via-white to-[#0066CC] mt-4 mx-auto rounded-full"
          />

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Profitez d&rsquo;un abonnement premium haute qualité : films
            récents, séries populaires, contenus du monde entier et événements
            en direct
          </motion.p>
        </motion.div>

        {/* Movies Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8 px-2">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white/90 border-l-4 border-[#0055A4] pl-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Films populaires
            </motion.h3>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-2 md:px-4 scroll-smooth hide-scrollbar">
            {movies.results
              .filter((show) => !show.adult)
              .slice(0, 10)
              .map((show, index) => (
                <motion.div
                  key={show.id}
                  className="snap-start flex-shrink-0 w-64 md:w-80"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm h-[400px] md:h-[450px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15 hover:border-white/30 group">
                    <CardContent className="p-0 h-full relative">
                      <Image
                        width={320}
                        height={480}
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-xl line-clamp-1">
                              {show.title}
                            </h4>
                            <span className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] text-white font-semibold px-3 py-1 rounded-full text-sm shadow-lg">
                              {show.vote_average.toFixed(1)}★
                            </span>
                          </div>
                          <p className="text-white/80 text-sm line-clamp-2">
                            {show.overview}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* TV Shows Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8 px-2">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white/90 border-l-4 border-[#0066CC] pl-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Séries les mieux notées
            </motion.h3>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-2 md:px-4 scroll-smooth hide-scrollbar">
            {tvShows.results.slice(0, 10).map((show, index) => (
              <motion.div
                key={show.id}
                className="snap-start flex-shrink-0 w-64 md:w-80"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm h-[400px] md:h-[450px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15 hover:border-white/30 group">
                  <CardContent className="p-0 h-full relative">
                    <Image
                      width={320}
                      height={480}
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-bold text-xl line-clamp-1">
                            {show.title}
                          </h4>
                          <span className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] text-white font-semibold px-3 py-1 rounded-full text-sm shadow-lg">
                            {show.vote_average.toFixed(1)}★
                          </span>
                        </div>
                        <p className="text-white/80 text-sm line-clamp-2">
                          {show.overview}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sports Section */}
      </div>

      {/* Hide Scrollbar Styles */}
    </section>
  );
};

export default ContentShowcase;
