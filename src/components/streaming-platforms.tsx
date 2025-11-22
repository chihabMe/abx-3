"use client";

import { useState } from "react";
import { Tv, Trophy, Globe } from "lucide-react";

export default function StreamingPlatforms() {
  const [activeCategory, setActiveCategory] = useState("entertainment");

  const entertainmentServices = [
    {
      name: "Netflix",
      logo: "N",
      color: "from-red-600 to-red-500",
    },
    {
      name: "HBO Max",
      logo: "HBO",
      color: "from-purple-600 to-blue-600",
    },
    {
      name: "Disney+",
      logo: "D+",
      color: "from-blue-600 to-purple-600",
    },
    {
      name: "Prime Video",
      logo: "PV",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Apple TV+",
      logo: "TV+",
      color: "from-gray-700 to-gray-500",
    },
    {
      name: "Paramount+",
      logo: "P+",
      color: "from-blue-700 to-blue-500",
    },
  ];

  const sportsChannels = [
    {
      name: "ESPN",
      logo: "ESPN",
      color: "from-red-600 to-red-700",
    },
    {
      name: "Sky Sports",
      logo: "SKY",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "beIN Sports",
      logo: "beIN",
      color: "from-green-600 to-green-700",
    },
    {
      name: "Eurosport",
      logo: "ES",
      color: "from-purple-600 to-purple-700",
    },
    {
      name: "RMC Sport",
      logo: "RMC",
      color: "from-orange-600 to-red-600",
    },
    {
      name: "Canal+",
      logo: "C+",
      color: "from-gray-800 to-black",
    },
  ];

  const categories = [
    {
      id: "entertainment",
      name: "Divertissement",
      icon: Tv,
      data: entertainmentServices,
    },
    {
      id: "sports",
      name: "Sports",
      icon: Trophy,
      data: sportsChannels,
    },
  ];

  const currentData =
    activeCategory === "entertainment" ? entertainmentServices : sportsChannels;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Plateformes Disponibles
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-purple-400 bg-clip-text text-transparent">
              Tous vos contenus
              <br />
              <span className="text-3xl md:text-4xl">en un seul endroit</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Accédez aux plus grandes plateformes de streaming et chaînes
              sportives du monde entier avec une seule application.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center">
            <div className="bg-card/50 backdrop-blur-sm rounded-full p-2 border border-accent/20">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-accent to-purple-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <category.icon size={20} />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {currentData.map((platform, index) => (
            <div
              key={platform.name}
              className="group relative bg-card/40 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative text-center space-y-3">
                {/* Logo */}
                <div
                  className={`w-16 h-16 mx-auto bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                >
                  {platform.logo}
                </div>

                {/* Name */}
                <h3 className="text-sm font-bold text-foreground">
                  {platform.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "100+",
                label: "Plateformes Disponibles",
                color: "text-accent",
              },
              {
                number: "50K+",
                label: "Contenus Premium",
                color: "text-purple-400",
              },
              {
                number: "24/7",
                label: "Streaming Sans Interruption",
                color: "text-green-400",
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
