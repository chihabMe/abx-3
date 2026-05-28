import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import ChannelPreview from "@/components/channel-preview";
import Pricing from "@/components/pricing";
import DeviceCompatibility from "@/components/device-compatibility";
// import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import CTABanner from "@/components/cta-banner";
import Footer from "@/components/footer";
import ContactModal from "@/components/modals/ContactModal";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <section id="accueil">
        <Hero />
      </section>
      <section id="fonctionnalités">
        <Features />
      </section>
      {/* <section id="plateformes"> */}
      {/* <StreamingPlatforms /> */}
      {/* </section> */}
      <section id="contenu-premium">
        <ChannelPreview />
      </section>

      <section id="tarifs">
        <Pricing />
      </section>
      <DeviceCompatibility />
      {/* <Testimonials /> */}
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Contactez-nous</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une question? Besoin d'aide? Notre équipe est là pour vous
              accompagner.
            </p>
            <ContactModal />
          </div>
        </div>
      </section>
      <CTABanner />
      <Footer />
    </main>
  );
}
