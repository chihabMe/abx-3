"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AbonixLogo from "@/components/AbonixLogo";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "accueil" },
    { name: "Contenus", href: "contenus" },
    { name: "Plateforme", href: "/entertainment", external: true },
    { name: "Fonctionnalités", href: "fonctionnalités" },
    { name: "Tarifs", href: "tarifs" },
    { name: "FAQ", href: "faq" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <>
      {/* Top Discount Banner */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2 text-center text-sm font-semibold">
        <span className="inline-flex items-center gap-2">
          🔥 OFFRE LIMITÉE: Premium à 52€ au lieu de 60€ | Standard à 35€ au
          lieu de 45€
          <span className="hidden sm:inline">- Économisez jusqu'à 8€ !</span>
        </span>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <AbonixLogo size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.external ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={`#${link.href}`}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                )
              )}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() =>
                  document
                    .getElementById("tarifs")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Commandez Maintenant
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navLinks.map((link) =>
                link.external ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={`#${link.href}`}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
              <div className="flex gap-2 pt-4 px-4">
                <Button
                  size="sm"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => {
                    setIsOpen(false);
                    document
                      .getElementById("tarifs")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Commandez Maintenant
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
