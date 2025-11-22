"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/20 via-purple-500/10 to-blue-500/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-full border border-accent/30 backdrop-blur-sm">
            <span className="text-accent font-semibold">
              🎬 Abonix Frane Premium
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-purple-400 bg-clip-text text-transparent leading-tight">
            Prêt pour l'Expérience
            <br />
            <span className="text-accent">Streaming Ultime?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Rejoignez plus de 100,000 utilisateurs satisfaits qui profitent déjà
            de notre technologie révolutionnaire et de notre contenu exclusif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent via-purple-500 to-blue-500 hover:from-accent/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white border-0 gap-2 relative overflow-hidden group px-8 py-4 rounded-full text-lg font-semibold shadow-2xl"
              onClick={() =>
                document
                  .getElementById("tarifs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Zap size={24} />
              <span>Démarrer Mon Essai Gratuit</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-2 border-accent/50 hover:bg-accent/20 hover:border-accent text-foreground px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm"
              onClick={() =>
                document
                  .getElementById("contenus")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Découvrir le Catalogue
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground">
                Aucune carte requise
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-muted-foreground">Annulation libre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-muted-foreground">
                Support premium inclus
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
