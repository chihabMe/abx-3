import React from "react";
import * as motion from "motion/react-m";
import { fadeIn, staggerContainer } from "@/lib/motions";

const steps = [
  {
    id: 1,
    title: "Choisissez votre forfait",
    description:
      "Sélectionnez l’abonnement qui correspond à vos besoins et à votre budget.",
    icon: (
      <svg
        className="w-8 h-8 text-[#0055A4]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Téléchargez et installez",
    description:
      "Téléchargez notre application sur votre appareil préféré et connectez-vous.",
    icon: (
      <svg
        className="w-8 h-8 text-[#0055A4]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Commencez à profiter",
    description:
      "Profitez d’un accès illimité à des milliers de films, séries et contenus de qualité.",
    icon: (
      <svg
        className="w-8 h-8 text-[#0055A4]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0055A4]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#0066CC]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Rejoignez Premium TV
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] bg-clip-text text-transparent">
              en 3 étapes simples
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "60%" }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-transparent via-[#0055A4] to-transparent mx-auto rounded-full mb-6"
          />

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Profitez d&apos;un accès instantané à tout votre divertissement avec
            notre processus d&apos;installation simple et rapide
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={fadeIn}
              className="relative flex flex-col items-center text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0055A4]/10 to-[#0066CC]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Step Number Circle */}
              <motion.div
                className="relative w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-[#0055A4]/20 to-[#0066CC]/20 backdrop-blur-sm border-2 border-white/20 mb-6"
                whileInView={{
                  boxShadow: [
                    "0 0 0px rgba(0, 85, 164, 0)",
                    "0 0 30px rgba(0, 85, 164, 0.6)",
                    "0 0 0px rgba(0, 85, 164, 0)",
                  ],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5,
                  },
                }}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-[#0055A4] to-[#0066CC] bg-clip-text text-transparent">
                  {step.id}
                </span>
              </motion.div>

              {/* Icon Container */}
              <motion.div
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-6 group-hover:bg-white/20 transition-all duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.3 + index * 0.2,
                }}
                viewport={{ once: true }}
              >
                {React.cloneElement(step.icon, {
                  className:
                    "w-8 h-8 text-[#0055A4] group-hover:text-[#0066CC] transition-colors duration-300",
                })}
              </motion.div>

              {/* Content */}
              <motion.h3
                className="relative text-xl font-bold text-white mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="relative text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>

              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-[#0055A4] to-transparent hidden md:block"
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  transition={{ delay: 1 + index * 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
