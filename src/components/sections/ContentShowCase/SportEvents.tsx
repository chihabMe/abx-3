"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import * as motion from "motion/react-m";

const sportImages = [
  { src: "/sport_events/sport4.webp", alt: "Premier League football players" },
  {
    src: "/sport_events/sport5.webp",
    alt: "Champions League football players",
  },
  { src: "/sport_events/sports12.webp", alt: "Sadui league" },
  {
    src: "/sport_events/sport1.webp",
    alt: "Football players from various leagues",
  },
  {
    src: "/sport_events/sport3.webp",
    alt: "Serie A football players",
    badge: "SERIE A",
  },
  { src: "/sport_events/sport6.webp", alt: "Sport image 6" },
  { src: "/sport_events/sport7.webp", alt: "Sport image 7" },
  { src: "/sport_events/sport8.webp", alt: "Sport image 8" },
  { src: "/sport_events/sport9.webp", alt: "Sport image 9" },
  { src: "/sport_events/sport10.webp", alt: "Sport image 10" },
  { src: "/sport_events/sport11.webp", alt: "Sport image 11" },
];

export default function SportEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-scroll for 5 seconds when section enters view
  useEffect(() => {
    if (!inView || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollSpeed = 10; // pixels per frame (~60fps => ~60px/sec)
    let frameId: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < 5000) {
        container.scrollLeft += scrollSpeed;
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  // Manual navigation
  const scrollLeft = () =>
    scrollContainerRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () =>
    scrollContainerRef.current?.scrollBy({ left: 350, behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-transparent py-12 px-4 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#0055A4]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#0066CC]/5 rounded-full blur-xl"></div>
      </div>

      <div className="mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
              Découvrez notre sélection de contenus
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0055A4] via-[#0066CC] to-[#0055A4] bg-clip-text text-transparent">
              sportifs variés
            </span>
          </h1>

          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "8%" }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-[#0055A4] via-white to-[#0066CC] mt-4 mx-auto rounded-full"
          />

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 py-3 px-6 rounded-2xl inline-block mt-6 mb-10">
            <p className="text-sm md:text-base text-white/90">
              Profitez d&apos;un large choix de contenus sportifs avec votre
              abonnement premium.
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <motion.button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 rounded-full p-3 shadow-xl transition-all duration-300 hidden md:block group"
            aria-label="Scroll left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft
              size={24}
              className="text-white group-hover:text-[#0055A4] transition-colors duration-300"
            />
          </motion.button>
          <motion.button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 rounded-full p-3 shadow-xl transition-all duration-300 hidden md:block group"
            aria-label="Scroll right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight
              size={24}
              className="text-white group-hover:text-[#0055A4] transition-colors duration-300"
            />
          </motion.button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth flex gap-6 pb-6 hide-scrollbar"
          >
            {sportImages.map((item, idx) => (
              <motion.div
                key={idx}
                className="min-w-[300px] md:min-w-[400px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[450px] md:h-[550px] bg-white/10 backdrop-blur-sm border border-white/20 group hover:bg-white/15 hover:border-white/30 transition-all duration-300">
                  <Image
                    src={item.src}
                    alt={item.alt ?? `image ${item.badge}`}
                    quality={80}
                    width={400}
                    height={550}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500 rounded-2xl"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {item.badge && (
                    <motion.div
                      className="absolute bottom-4 right-4 bg-gradient-to-r from-[#0055A4] to-[#0066CC] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {item.badge}
                    </motion.div>
                  )}

                  {/* Hover Indicator */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#0055A4] to-[#0066CC] rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
