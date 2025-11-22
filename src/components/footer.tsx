import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import AbonixLogo from "@/components/AbonixLogo";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <AbonixLogo size="md" />
            </div>
            <p className="text-muted-foreground text-sm">
              Plateforme de streaming premium avec des milliers de contenus en
              4K et un service client disponible 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#accueil"
                  className="hover:text-foreground transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#contenus"
                  className="hover:text-foreground transition-colors"
                >
                  Contenus
                </a>
              </li>
              <li>
                <a
                  href="#tarifs"
                  className="hover:text-foreground transition-colors"
                >
                  Tarifs
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#contact"
                  className="hover:text-foreground transition-colors"
                >
                  Nous Contacter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Centre d'Aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Page de Statut
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Conditions d'Utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Politique de Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Politique de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Nous Acceptons:
              </span>
              <div className="flex gap-3">
                <div className="w-10 h-6 bg-card rounded flex items-center justify-center text-xs font-semibold">
                  Visa
                </div>
                <div className="w-10 h-6 bg-card rounded flex items-center justify-center text-xs font-semibold">
                  MC
                </div>
                <div className="w-10 h-6 bg-card rounded flex items-center justify-center text-xs font-semibold">
                  PP
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2025 Abonix. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
