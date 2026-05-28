"use client";

import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Headphones,
  MonitorSmartphone,
  Play,
  ShieldCheck,
  Sparkles,
  Tv,
  Wifi,
} from "lucide-react";
import Image from "next/image";

const highlights = [
  { icon: BadgeCheck, label: "4K Ultra HD" },
  { icon: Clock3, label: "Activation rapide" },
  { icon: ShieldCheck, label: "Support 24/7" },
];

const devices = ["Smart TV", "Android", "iPhone", "PC"];

const serviceMetrics = [
  { label: "Qualite", value: "4K", detail: "FHD / HD inclus" },
  { label: "Setup", value: "5 min", detail: "Guide simple" },
  { label: "Support", value: "24/7", detail: "WhatsApp direct" },
];

export default function Hero() {
  const scrollToPricing = () => {
    document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-104px)] overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Image
          src="/hero-iptv-abofranc4k.png"
          alt="Streaming 4K sur TV, ordinateur et mobile"
          fill
          className="object-cover object-center opacity-55"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,24,0.98)_0%,rgba(8,27,24,0.86)_42%,rgba(8,27,24,0.38)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-104px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/70 px-4 py-2 text-sm font-semibold text-accent shadow-lg shadow-black/20 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            abofranc4k.live
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Streaming 4K stable pour sport, films et series.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            AboFranc4K Live vous donne un acces rapide a vos chaines et contenus
            preferes, avec une qualite nette, une installation simple et un
            support disponible quand vous en avez besoin.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={scrollToPricing}
              className="h-14 rounded-md bg-accent px-7 text-base font-black text-accent-foreground hover:bg-accent/90"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Demarrer l'essai 1h
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="h-14 rounded-md border-primary/60 bg-background/30 px-7 text-base font-bold text-foreground backdrop-blur hover:bg-primary/15"
            >
              Voir les abonnements
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border-l-2 border-accent/70 bg-card/45 px-4 py-3 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="ml-auto max-w-md overflow-hidden rounded-xl border border-white/15 bg-card/75 shadow-2xl shadow-black/35 backdrop-blur-xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-primary/18 to-accent/12 p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-bold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
                    Disponible maintenant
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Pack IPTV pret
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-foreground">
                    AboFranc4K
                  </h2>
                </div>
                <div className="rounded-lg bg-background/55 p-3">
                  <Tv className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                {serviceMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-white/10 bg-background/45 p-3"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-2xl font-black text-foreground">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {metric.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-background/35 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <MonitorSmartphone className="h-4 w-4 text-accent" />
                  Compatible avec vos appareils
                </div>
                <div className="flex flex-wrap gap-2">
                  {devices.map((device) => (
                    <span
                      key={device}
                      className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
                    >
                      {device}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <div
                  className="flex items-center gap-3 rounded-lg bg-background/35 p-4"
                >
                  <div className="rounded-md bg-primary/15 p-2">
                    <Wifi className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">
                      Streaming stable
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Optimise pour les matchs, films et series en direct.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-accent/20 bg-accent/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-accent/20 p-2">
                      <Headphones className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">
                        Assistance rapide
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Installation accompagnee sur WhatsApp.
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
