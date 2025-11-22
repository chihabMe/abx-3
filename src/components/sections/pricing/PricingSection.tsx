import * as motion from "motion/react-m";
import pricingData from "@/data/pricing.json";
import PricingHeader from "./pricingHeader";
import PricingCard from "./PricingCard";
import { fadeIn, staggerContainer } from "@/lib/motions";

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const PricingSection = () => {
  return (
    <section
      id="ultimate-pricing"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0055A4]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#0066CC]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <PricingHeader />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {pricingData.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/80 mt-12 text-lg"
        >
          Toutes les offres incluent des mods stables, rapides et de haute
          qualité.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
