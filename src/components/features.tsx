import {
  Tv,
  Zap,
  Shield,
  Smartphone,
  RefreshCw,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Streaming 4K Ultra HD+",
    description:
      "Expérience cinématographique exceptionnelle avec une qualité visuelle époustouflante en 4K Ultra HD et support HDR10+.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description:
      "Équipe d'experts dédiée disponible en permanence pour une assistance personnalisée et immédiate.",
  },
  {
    icon: Zap,
    title: "Technologie Zero-Buffer™",
    description:
      "Infrastructure révolutionnaire avec CDN mondial garantissant un streaming instantané sans interruption.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Excellence",
    description:
      "Synchronisation parfaite sur tous vos appareils avec reprise automatique là où vous vous êtes arrêté.",
  },
  {
    icon: RefreshCw,
    title: "Catalogue mis a jour",
    description:
      "Bibliothèque en expansion constante avec des exclusivités et des premières mondiales chaque semaine.",
  },
  {
    icon: Shield,
    title: "Sécurité Niveau Enterprise",
    description:
      "Protection avancée de vos données avec chiffrement AES-256 et conformité RGPD totale.",
  },
];

export default function Features() {
  return (
    <section className="bg-card/45 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Pourquoi Choisir AboFranc4K Live?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez l'excellence du streaming nouvelle génération avec des
            technologies révolutionnaires et un service client inégalé.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-background to-primary/5 p-8 transition-all duration-500 hover:border-accent/70 hover:shadow-2xl hover:shadow-accent/15"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-block rounded-md bg-gradient-to-br from-accent/20 to-primary/20 p-4 transition-all duration-300 group-hover:from-accent/30 group-hover:to-primary/30">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
