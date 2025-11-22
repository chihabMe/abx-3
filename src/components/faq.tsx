"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Ai-je besoin d'un VPN pour utiliser Abonix?",
    answer:
      "Non, Abonix est un service légitime. Cependant, utiliser un VPN est optionnel et peut offrir des avantages supplémentaires en matière de confidentialité.",
  },
  {
    question: "Y a-t-il un essai gratuit?",
    answer:
      "Oui! Nous offrons un essai gratuit de 7 jours pour les nouveaux utilisateurs. Aucune carte de crédit requise pour commencer.",
  },
  {
    question: "Sur combien d'appareils puis-je accéder simultanément?",
    answer:
      "Cela dépend de votre plan. Les plans mensuels permettent 2 accès, les plans de 6 mois permettent 4 accès, et les plans annuels permettent des accès simultanés illimités.",
  },
  {
    question: "Que faire si je rencontre des problèmes de connexion?",
    answer:
      "Notre équipe de support 24/7 est prête à vous aider. Nous avons également un guide de dépannage complet sur notre site web.",
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment?",
    answer:
      "Oui, vous pouvez annuler votre abonnement à tout moment sans pénalités. Votre accès continue jusqu'à la fin de votre période de facturation.",
  },
  {
    question: "Quels modes de paiement acceptez-vous?",
    answer:
      "Nous acceptons toutes les principales cartes de crédit, PayPal, et les cryptomonnaies pour un maximum de flexibilité.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Questions Fréquemment Posées
          </h2>
          <p className="text-xl text-muted-foreground">
            Trouvez des réponses aux questions courantes sur Abonix
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenId(openId === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
              >
                <h3 className="font-semibold text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
                    openId === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openId === index && (
                <div className="px-6 py-4 bg-background border-t border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
