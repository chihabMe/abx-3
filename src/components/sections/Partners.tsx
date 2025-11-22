"use client";
import React, { useEffect, useRef } from "react";
import * as motion from "motion/react-m";
import partnersData from "@/data/partners.json";
import Image from "next/image";
import { useAnimationControls, useInView } from "motion/react";

interface Partner {
  id: string | number;
  name: string;
  logo: string;
  [key: string]: any;
}

const Partners = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Marquee animation with two duplicate sets for seamless looping
  const marqueeVariants = {
    animate: {
      x: [0, -2000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-8 overflow-hidden relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="text-center"
        >
          {/* Enhanced Header */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
              Our Partners
            </h3>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0055A4] to-transparent mx-auto rounded-full"
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: {
                  width: "6rem",
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.3,
                  },
                },
              }}
            />
          </motion.div>

          {/* Enhanced Partner Grid */}
          <motion.div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 mb-12">
            {partnersData.logos
              .slice(0, 6)
              .map((partner: Partner, index: number) => (
                <motion.div
                  key={partner.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                      scale: 0.8,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 120,
                        delay: index * 0.1,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative p-4 md:p-6 transition-all duration-300"
                >
                  {/* Bright Light Effect */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-t from-white/20 via-white/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-t from-[#0055A4]/30 via-[#0055A4]/15 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gradient-to-t from-white/40 via-white/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
                  </div>

                  <div className="w-full h-16 md:h-20 relative">
                    <Image
                      fill
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-full h-full object-contain transition-all duration-300 filter brightness-75 group-hover:brightness-110 group-hover:drop-shadow-lg"
                      sizes="(max-width: 768px) 100vw, 160px"
                    />
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Marquee Animation for Additional Partners */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex overflow-hidden relative w-full">
              <motion.div
                className="flex space-x-8 absolute whitespace-nowrap"
                variants={marqueeVariants}
                animate="animate"
                style={{ width: "fit-content" }}
              >
                {partnersData.logos.map((partner: Partner, index: number) => (
                  <div
                    key={`marquee-${partner.id}-${index}`}
                    className="group relative p-4 rounded-xl inline-block transition-all duration-300"
                  >
                    {/* Bright Light Effect for Marquee */}
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-t from-white/15 via-white/8 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gradient-to-t from-[#0055A4]/20 via-[#0055A4]/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </div>

                    <div className="w-20 h-10 relative">
                      <Image
                        fill
                        src={partner.imageUrl}
                        alt={partner.name}
                        className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-all duration-300 filter brightness-75 group-hover:brightness-110 group-hover:drop-shadow-md"
                        sizes="(max-width: 768px) 100vw, 80px"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Radial gradient background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-[#0055A4]/5 blur-3xl rounded-full pointer-events-none z-0"></div>
    </section>
  );
};

export default Partners;
