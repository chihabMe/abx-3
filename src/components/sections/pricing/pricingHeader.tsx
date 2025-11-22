import * as motion from "motion/react-m";

const PricingHeader = () => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <span className="bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
          Choisissez votre
        </span>
        <br />
        <span className="bg-gradient-to-r from-[#0055A4] via-[#0066CC] to-[#0055A4] bg-clip-text text-transparent">
          abonnement premium
        </span>
      </motion.h2>

      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "8%" }}
        transition={{ delay: 0.8, duration: 1 }}
        viewport={{ once: true }}
        className="h-1 bg-gradient-to-r from-[#0055A4] via-white to-[#0066CC] mt-4 mx-auto rounded-full"
      />

      <motion.p
        className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Profitez d&apos;un accès complet à notre catalogue de chaînes et vidéos
        à la demande en qualité 4K. Choisissez l&apos;offre qui vous convient le
        mieux.
      </motion.p>
    </motion.div>
  );
};

export default PricingHeader;
