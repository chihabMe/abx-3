"use client";

import React from "react";
import * as motion from "motion/react-m";
import { fadeIn } from "@/lib/motions";
import Image from "next/image";
import { whatsupNumber } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black px-6 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gauche: Logo & À propos + Liens rapides */}
          <motion.div
            className="flex flex-col md:flex-row md:space-x-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.webp"
                  width={100}
                  height={100}
                  className="w-20 h-20"
                  alt="Logo"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Votre plateforme de divertissement avec un support client
                disponible 24/7.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Liens</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#0055A4] transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#features"
                    className="hover:text-[#0055A4] transition-colors"
                  >
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="hover:text-[#0055A4] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href={`https://wa.me/${whatsupNumber}`}
                    className="hover:text-[#0055A4] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Droite: Contact */}
          <motion.div
            className="flex flex-col items-start w-full md:pl-40"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              Contactez-nous
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  href={`https://wa.me/${whatsupNumber}`}
                  target="_blank"
                  className="hover:text-[#0055A4] transition-colors cursor-pointer"
                >
                  {whatsupNumber}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-gray-500 text-sm">
              © 2025 Premium TV. Tous droits réservés.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-[#0055A4] text-sm">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-500 hover:text-[#0055A4] text-sm">
              Conditions d&lsquo;utilisation
            </a>
            <a href="#" className="text-gray-500 hover:text-[#0055A4] text-sm">
              Paramètres des cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
