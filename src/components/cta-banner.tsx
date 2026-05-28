"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-block rounded-md border border-accent/30 bg-accent/10 px-6 py-3 backdrop-blur-sm">
            <span className="text-accent font-semibold">
              AboFranc4K Live
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent leading-tight">
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
              className="group relative gap-2 overflow-hidden rounded-md border-0 bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground shadow-2xl hover:bg-accent/90"
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
              className="gap-2 rounded-md border-2 border-primary/50 bg-transparent px-8 py-4 text-lg font-semibold text-foreground backdrop-blur-sm hover:border-primary hover:bg-primary/20"
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
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-muted-foreground">Annulation libre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
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
