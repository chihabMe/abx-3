import React from "react";
import * as motion from "motion/react-m";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Qu'est-ce que 4kverse ?",
      answer:
        "4kverse est une plateforme de divertissement premium offrant un accès à du contenu de qualité sur tous vos appareils.",
    },
    {
      question: "Comment fonctionne 4kverse ?",
      answer:
        "Il vous suffit de vous abonner à un plan, de créer votre compte et de commencer à profiter du contenu sur tout appareil compatible.",
    },
    {
      question: "Quels appareils sont pris en charge ?",
      answer:
        "4kverse fonctionne sur les Smart TVs, les smartphones, les tablettes, les ordinateurs et les lecteurs multimédias.",
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer:
        "Oui, vous avez un contrôle total sur votre abonnement et pouvez annuler à tout moment.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0055A4]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#0066CC]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
              Questions
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0055A4] to-[#0066CC] bg-clip-text text-transparent">
              Fréquemment Posées
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
            Découvrez toutes les réponses aux questions essentielles sur notre
            service de streaming premium, nos abonnements et nos fonctionnalités
            avancées
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0055A4]/10 to-[#0066CC]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <AccordionTrigger className="relative px-6 py-6 hover:bg-transparent transition-colors text-lg md:text-xl font-semibold text-white data-[state=open]:text-transparent data-[state=open]:bg-clip-text data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#0055A4] data-[state=open]:to-[#0066CC] [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="relative px-6 pb-6 text-base md:text-lg text-gray-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
