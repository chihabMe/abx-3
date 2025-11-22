"use client";
import * as motion from "motion/react-m";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { fadeIn } from "@/lib/motions";
import { PricingPlan } from "./PricingSection";
import SubscribeModal from "@/components/modals/SubscriptionModal";
import { useState } from "react";

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      className={`relative group ${
        plan.highlighted
          ? "bg-gradient-to-br from-[#0055A4]/20 to-[#0066CC]/20 border-2 border-[#0055A4]/50"
          : "bg-white/10 border border-white/20"
      } backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:scale-105`}
      whileHover={{ y: -5 }}
    >
      {/* Popular Badge */}
      {plan.highlighted && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            ⭐ Le plus populaire
          </div>
        </motion.div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-white/70 text-sm">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-extrabold text-white">
            {plan.price}
          </span>
          <span className="text-xl text-white/80 ml-1">€</span>
        </div>
        <p className="text-white/60 text-sm mt-2">{plan.period}</p>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-5 h-5 bg-gradient-to-r from-[#0055A4] to-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-white/80 text-sm">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className={`w-full py-6 text-lg font-semibold rounded-2xl transition-all duration-300 ${
          plan.highlighted
            ? "bg-gradient-to-r from-[#0055A4] to-[#0066CC] hover:from-[#0044A3] hover:to-[#0055BB] text-white shadow-xl hover:shadow-2xl"
            : "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {plan.cta}
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </span>
      </Button>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plan}
      />
      {/* Background Glow Effect */}
      {plan.highlighted && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0055A4]/5 to-[#0066CC]/5 rounded-3xl blur-xl -z-10 group-hover:from-[#0055A4]/10 group-hover:to-[#0066CC]/10 transition-all duration-300" />
      )}
    </motion.div>
  );
};

export default PricingCard;
