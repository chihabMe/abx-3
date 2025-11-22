"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import pricingData from "@/data/pricing.json";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface PricingPlan {
  id: string;
  name: string;
  price: string | number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleSubscribe = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section id="ultimate-pricing" className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Plans Abonix Frane - Excellence à Tous Niveaux
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvrez nos offres premium adaptées à vos besoins, avec une
            garantie de satisfaction à 100%
          </p>
          {/* Discount Banner */}
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <span className="text-red-400 font-bold text-sm">
              🔥 OFFRE LIMITÉE
            </span>
            <span className="text-foreground font-semibold text-sm">
              Économisez jusqu'à 8€ sur nos abonnements !
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingData.plans.map((plan, index) => (
            <div
              key={plan.id}
              id={plan.id === "Free-Trial" ? "free-trial" : undefined}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent shadow-lg shadow-accent/20 md:scale-105"
                  : "bg-background border border-border hover:border-accent/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  {plan.description}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  {plan.originalPrice && (
                    <span className="text-2xl font-semibold text-muted-foreground line-through">
                      €{plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold">
                    {typeof plan.price === "number" && plan.price === 0
                      ? "Gratuit"
                      : `€${plan.price}`}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="mt-2 inline-block bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                    ÉCONOMISEZ €
                    {plan.originalPrice -
                      (typeof plan.price === "number" ? plan.price : 0)}
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan)}
                className={`w-full ${
                  plan.highlighted
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlan(null);
          }}
          plan={{
            ...selectedPlan,
            price:
              typeof selectedPlan.price === "string"
                ? parseFloat(selectedPlan.price)
                : selectedPlan.price,
          }}
        />
      )}
    </section>
  );
}
