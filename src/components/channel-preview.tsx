"use client";

import { useState } from "react";

const channels = [
  { id: 1, title: "Action Movies", image: "/action-movie-poster.png" },
  { id: 2, title: "Sports Live", image: "/sports-live-broadcast.png" },
  { id: 3, title: "Drama Series", image: "/drama-series-poster.png" },
  { id: 4, title: "Comedy Shows", image: "/comedy-show-thumbnail.jpg" },
  { id: 5, title: "Documentaries", image: "/documentary-film.jpg" },
  { id: 6, title: "Kids Content", image: "/kids-cartoon-show.jpg" },
];

export default function ChannelPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Bibliothèque AboFranc4K Live
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Films, Séries, Documentaires, Sport en Direct — Plus de 100,000
            contenus 4K exclusifs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredId(channel.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={channel.image || "/placeholder.svg"}
                alt={channel.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm font-semibold text-white">
                  {channel.title}
                </p>
              </div>
              {hoveredId === channel.id && (
                <div className="absolute inset-0 border-2 border-accent rounded-lg" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
