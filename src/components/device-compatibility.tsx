import { Tv, Smartphone, Tablet, Monitor, Zap } from "lucide-react";

const devices = [
  { icon: Tv, name: "Smart TV", description: "LG, Samsung, Sony, and more" },
  { icon: Smartphone, name: "Android", description: "All Android devices" },
  { icon: Smartphone, name: "iOS", description: "iPhone and iPad" },
  { icon: Monitor, name: "PC/Mac", description: "Windows and macOS" },
  { icon: Zap, name: "Firestick", description: "Amazon Fire devices" },
  { icon: Tablet, name: "Tablets", description: "All tablet devices" },
];

export default function DeviceCompatibility() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Accédez sur Tous les Appareils
          </h2>
          <p className="text-xl text-muted-foreground">
            N'importe Quand, N'importe Où — Votre Divertissement Vous Suit
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {devices.map((device, index) => {
            const Icon = device.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="mb-4 inline-block p-4 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">{device.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {device.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
