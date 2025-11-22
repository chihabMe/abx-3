"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { submitContactAction } from "@/app/actoins/contact-actions";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
    phoneNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit the contact form using the contact action
      const response = await submitContactAction({
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber || undefined,
        message: `Type: ${formData.type}\nSubject: ${formData.subject}\n\n${formData.message}`,
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          type: "general",
          phoneNumber: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(response?.data?.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Une erreur est survenue lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Chat en Direct",
      description:
        "Obtenez une assistance instantanée avec notre chat en direct 24/7",
      action: "Démarrer le Chat",
      highlight: true,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Support Email",
      description:
        "Envoyez-nous un email détaillé et recevez une réponse dans les 2 heures",
      action: "support@abonix.com",
      link: "mailto:support@abonix.com",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Phone,
      title: "Assistance Téléphonique",
      description: "Parlez directement à nos experts techniques",
      action: "+33 (0)1 23 45 67 89",
      link: "tel:+33123456789",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const supportStats = [
    { icon: Clock, value: "< 2min", label: "Temps de réponse moyen" },
    { icon: Users, value: "24/7", label: "Support disponible" },
    { icon: CheckCircle, value: "99.9%", label: "Taux de satisfaction" },
    { icon: Zap, value: "15k+", label: "Clients aidés ce mois" },
  ];

  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        {/* Hero Section with Background */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/background.webp"
              alt="Contact background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-accent to-blue-400 bg-clip-text text-transparent">
                Contactez-Nous
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Notre équipe d'experts est disponible 24/7 pour vous offrir la
                meilleure assistance
              </p>
              <div className="flex items-center justify-center gap-2 text-accent">
                <Zap className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  Réponse garantie en moins de 2 minutes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Support Stats */}
        <section className="py-16 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {supportStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Choisissez Votre Méthode de Contact
              </h2>
              <p className="text-xl text-muted-foreground">
                Nous sommes là pour vous aider de la manière qui vous convient
                le mieux
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`relative group p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    method.highlight
                      ? "bg-gradient-to-br from-accent/10 to-blue-500/10 border-accent/50 shadow-lg shadow-accent/25"
                      : "bg-card border-border hover:border-accent/50"
                  }`}
                >
                  {method.highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">
                        Recommandé
                      </span>
                    </div>
                  )}

                  <div
                    className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${method.gradient} p-0.5`}
                  >
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  {method.link ? (
                    <a
                      href={method.link}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
                    >
                      {method.action}
                    </a>
                  ) : (
                    <Button
                      className={`w-full bg-gradient-to-r ${method.gradient} hover:opacity-90 transition-all`}
                    >
                      {method.action}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Contact Form */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-card/50 to-card border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-accent/10 to-blue-500/10 p-8 border-b border-border/50">
                  <h2 className="text-3xl font-bold mb-2">
                    Envoyez-nous un Message Détaillé
                  </h2>
                  <p className="text-muted-foreground">
                    Remplissez le formulaire ci-dessous et nous vous répondrons
                    rapidement
                  </p>
                </div>

                <div className="p-8">
                  {submitted && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                          <p className="font-semibold text-green-600">
                            Message envoyé avec succès !
                          </p>
                          <p className="text-sm text-green-600/80">
                            Nous vous répondrons dans les plus brefs délais.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Type Selection */}
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-semibold mb-3 text-foreground"
                      >
                        Type de Demande
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                      >
                        <option value="general">Question Générale</option>
                        <option value="technical">Support Technique</option>
                        <option value="billing">Facturation</option>
                        <option value="partnership">Partenariat</option>
                        <option value="complaint">Réclamation</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold mb-3 text-foreground"
                        >
                          Nom Complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted-foreground/50"
                          placeholder="Votre nom complet"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold mb-3 text-foreground"
                        >
                          Adresse Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted-foreground/50"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-semibold mb-3 text-foreground"
                        >
                          Numéro de Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted-foreground/50"
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold mb-3 text-foreground"
                        >
                          Sujet *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted-foreground/50"
                          placeholder="Résumé de votre demande"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold mb-3 text-foreground"
                      >
                        Message Détaillé *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none placeholder-muted-foreground/50"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-500/90 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Envoyer le Message
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold mb-6">Questions Fréquentes</h3>
              <p className="text-muted-foreground mb-8">
                Trouvez peut-être votre réponse rapidement
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  className="p-6 h-auto flex-col gap-2 hover:border-accent transition-all"
                >
                  <div className="font-semibold">Installation</div>
                  <div className="text-sm text-muted-foreground">
                    Comment configurer StreamMax
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-6 h-auto flex-col gap-2 hover:border-accent transition-all"
                >
                  <div className="font-semibold">Facturation</div>
                  <div className="text-sm text-muted-foreground">
                    Gérer vos abonnements
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-6 h-auto flex-col gap-2 hover:border-accent transition-all"
                >
                  <div className="font-semibold">Technique</div>
                  <div className="text-sm text-muted-foreground">
                    Résoudre les problèmes
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
