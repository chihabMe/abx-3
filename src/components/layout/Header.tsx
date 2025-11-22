"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import SpecialOfferHeader from "@/components/layout/SpecialOfferHeader";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "../modals/ContactModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/channels", label: "Chaînes" },
    { href: "/#features", label: "Fonctionnalités" },
    { href: "/#ultimate-pricing", label: "Tarifs" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-1 px-3 sm:px-4 md:px-6 lg:px-12 "
      style={{
        backgroundColor: headerBg,
        backdropFilter: `blur(${headerBlur}px)`,
        WebkitBackdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      <SpecialOfferHeader />
      <div className="container mx-auto flex justify-between items-center py-1 sm:py-2">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Link href="/">
              <Image
                src="/logo.webp"
                width={200}
                height={200}
                className="w-48 h-36 sm:w-52 sm:h-40 md:w-60 md:h-44 lg:w-72 lg:h-52 xl:w-80 xl:h-56 object-contain filter drop-shadow-lg"
                alt="logo image"
              />
            </Link>
          </div>
        </motion.div>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 bg-white/5 backdrop-blur-sm rounded-full px-4 xl:px-6 py-2 xl:py-3">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group px-2 xl:px-3 py-1 rounded-lg text-sm xl:text-base"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Contact Us Button */}
          <motion.div
            className="cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1 + 0.2 }}
            whileHover={{
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ContactModal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <Link href={"/#ultimate-pricing"}>
              <Button className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] hover:from-[#0044A3] hover:to-[#0055BB] px-4 md:px-6 py-2 md:py-3 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                <span className="flex items-center gap-2">
                  Commencer
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Bouton Menu Mobile */}
        <motion.button
          className="md:hidden z-50 cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 rounded-full transition-all duration-300 text-white hover:bg-white/20 hover:scale-110 active:scale-95"
          onClick={toggleMobileMenu}
          aria-label="Basculer le menu"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "100vh",
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.3 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.2 },
              },
            }}
            className="fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-xl md:hidden"
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0055A4]/10 rounded-full blur-2xl"></div>
              <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#0055A4]/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <motion.nav
              className="relative flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8 px-6 py-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="relative text-white text-xl sm:text-2xl font-medium hover:text-[#0055A4] transition-all duration-300 group px-4 sm:px-6 py-2 sm:py-3 rounded-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: "#0055A4",
                    textShadow: "0 0 20px rgba(0, 85, 164, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0055A4]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.a>
              ))}

              {/* Contact Us Button in Mobile Menu */}
              <motion.div
                className="mt-6 sm:mt-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    },
                  },
                }}
              >
                <ContactModal />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    },
                  },
                }}
              >
                <Link href={"/#ultimate-pricing"}>
                  <Button className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] hover:from-[#0044A3] hover:to-[#0055BB] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl w-56 sm:w-64 h-14 sm:h-16 text-base sm:text-lg font-semibold mt-6 sm:mt-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-2 sm:gap-3">
                      Commencer
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
