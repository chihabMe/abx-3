"use client";

import { Button } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background.webp"
          alt="Fond d'écran premium"
          fill
          className="object-cover"
          priority
        />
        {/* Enhanced Overlay with gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-purple-500/10" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full filter blur-xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-500/20 rounded-full filter blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-500/20 rounded-full filter blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-accent/30 rounded-full filter blur-lg animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-center">
          {/* Centered Content */}
          <div className="space-y-8 max-w-2xl text-center">
            <div className="space-y-4">
              {/* Free Trial Highlight Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-purple-500/20 border border-accent/30 rounded-full px-6 py-3 text-sm font-medium text-accent backdrop-blur-sm">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>🚀 Essai gratuit premium - 1h d'accès complet</span>
              </div>

              {/* Discount Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 text-sm font-bold backdrop-blur-sm">
                <span className="text-red-400">🔥 OFFRE LIMITÉE</span>
                <span className="text-foreground">
                  Premium 52€ au lieu de 60€ | Standard 35€ au lieu de 45€
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight bg-gradient-to-r from-foreground via-accent to-purple-400 bg-clip-text text-transparent">
                Abonix Frane
                <br />
                <span className="text-4xl md:text-5xl">
                  Streaming Nouvelle Génération
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
                Découvrez l'excellence du streaming 4K Ultra HD avec plus de
                50,000 contenus exclusifs, zéro buffering et une expérience
                immersive révolutionnaire.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent via-purple-500 to-blue-500 hover:from-accent/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white border-0 gap-2 relative overflow-hidden group px-8 py-4 rounded-full text-lg font-semibold shadow-2xl"
                onClick={() => {
                  // First scroll to pricing section
                  document
                    .getElementById("tarifs")
                    ?.scrollIntoView({ behavior: "smooth" });

                  // Then after a short delay, scroll to the specific free trial card
                  setTimeout(() => {
                    document
                      .getElementById("free-trial")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 500);
                }}
              >
                <Play size={24} />
                <span>Démarrer Maintenant - Gratuit</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent border-2 border-accent/50 hover:bg-accent/20 hover:border-accent text-foreground px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm"
                onClick={() =>
                  document
                    .getElementById("tarifs")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Zap size={24} />
                Explorer les Offres
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-foreground font-semibold">
                  1h Gratuit Premium
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-foreground font-medium">
                  99,99% Uptime Garanti
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-sm text-foreground font-medium">
                  4K Ultra HD
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm text-foreground font-medium">
                  Support 24/7/365
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
