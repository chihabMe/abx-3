"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

const SpecialOfferHeader = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-gradient-to-r from-black/90 via-[#0055A4]/20 to-black/90 backdrop-blur-sm text-white py-3 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0055A4]/10 via-transparent to-[#0055A4]/10"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/4 right-12 w-1 h-1 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-[#0055A4]/30 rounded-full blur-sm"></div>
      </div>

      <div className="relative flex items-center justify-center sm:justify-between">
        <div className="flex items-center text-center sm:text-left">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="h-4 w-4 sm:h-5 sm:w-5 mr-3 text-[#0055A4] bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              ⚡
            </div>
          </motion.div>
          <span className="text-xs sm:text-sm md:text-base font-medium">
            <span className="hidden sm:inline">
              🚀 Service Ultra-Rapide & Fiable
            </span>
            <span className="sm:hidden">🚀 Service Rapide</span>
            <span className="font-bold text-[#0055A4] ml-2 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              99.9% Uptime
            </span>
            <span className="hidden md:inline text-white/80 ml-2">
              • Disponible 24/7
            </span>
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm text-green-300 font-medium">
              En ligne
            </span>
          </motion.div>
          <motion.button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </motion.button>
        </div>

        {/* Mobile close button */}
        <motion.button
          onClick={() => setIsVisible(false)}
          className="sm:hidden absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-3 w-3" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SpecialOfferHeader;
