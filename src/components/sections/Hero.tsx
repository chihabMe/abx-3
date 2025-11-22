import React from "react";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
// import Partners from "./Partners";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center py-12 md:py-16 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
  >
    {/* Enhanced Background with Parallax Effect */}
    <div className="absolute inset-0 z-0">
      <motion.div
        initial={{ scale: 1.1, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50 z-10" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0055A4]/20 via-transparent to-[#0066CC]/20 z-20" /> */}
        <Image
          src="/background.png"
          alt="Hero background"
          fill
          priority
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="object-cover object-center"
          style={{ objectPosition: "center 30%" }}
        />
      </motion.div>
    </div>

    {/* Enhanced Animated Particles */}
    <motion.div
      className="absolute inset-0 z-10 opacity-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 0.8, duration: 1.5 }}
    >
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: `linear-gradient(45deg, rgba(0, 85, 164, ${Math.random() * 0.8 + 0.2}), rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3}))`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.8, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </motion.div>

    {/* Floating Gradient Orbs */}
    <div className="absolute inset-0 z-5 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0055A4]/20 rounded-full blur-2xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#0066CC]/15 rounded-full blur-xl"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>

    {/* Main Content with Glass Morphism */}
    <div className="container mx-auto px-4 sm:px-6 pt-10 relative z-20 mt-16 md:mt-20">
      <motion.div
        className="max-w-4xl mx-auto text-center relative"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Main Container */}
        <motion.div
          className="relative p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#0055A4] to-transparent rounded-full"></div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight"
            variants={fadeIn}
          >
            <span className="bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
              L&apos;univers de 4kverse
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-[#0055A4] via-[#0066CC] to-[#0055A4] bg-clip-text text-transparent font-extrabold"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              révolutionné par 4kverse
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
              Qualité 4K, prix imbattables.
            </span>
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0055A4]/20 via-transparent to-[#0066CC]/20 z-20" /> */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-[#0055A4] via-white to-[#0066CC] mt-4 mx-auto rounded-full"
            />
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-100/90 mb-8 md:mb-12 leading-relaxed font-light"
            variants={fadeIn}
          >
            <span className="font-medium text-white">4kverse</span> - Découvrez
            une{" "}
            <motion.span
              className="font-bold text-[#0055A4] text-xl md:text-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              expérience de 4kverse
            </motion.span>{" "}
            unique avec un{" "}
            <motion.span
              className="font-bold text-[#0066CC] text-xl md:text-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              contenu de qualité
            </motion.span>{" "}
            et un support client disponible 24h/24
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
            variants={fadeIn}
          >
            <Link href="#ultimate-pricing" className="group">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] hover:from-[#0044A3] hover:to-[#0055BB] text-white text-lg md:text-xl font-semibold w-full px-8 py-6 md:px-10 md:py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20">
                  <span className="flex items-center gap-3">
                    <span>🚀</span>
                    Commencer maintenant
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="#ultimate-pricing">
                <Button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-lg md:text-xl font-semibold w-full px-8 py-6 md:px-10 md:py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <span className="flex items-center gap-3">
                    <span>⚡</span>Test gratuit 1h
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Partners section with enhanced styling */}
      {/* <motion.div
        className="mt-12 md:mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      > */}
      {/* <div className="  rounded-2xl p-6 md:p-8"> */}
      {/* <Partners /> */}
      {/* </div> */}
      {/* </motion.div> */}
    </div>
  </section>
);

export default Hero;
