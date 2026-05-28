import type React from "react";
import Script from "next/script";
import type { Metadata } from "next";
import ConditionalAnalytics from "@/components/ConditionalAnalytics";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AboFranc4K Live - Streaming 4K Premium",
  description:
    "abofranc4k.live - Service de streaming 4K premium avec sport, films, series, support 24/7 et haute disponibilite.",
  metadataBase: new URL("https://abofranc4k.live"),
  openGraph: {
    title: "AboFranc4K Live",
    description:
      "Streaming 4K premium, sport en direct, films et series sur tous vos appareils.",
    url: "https://abofranc4k.live",
    siteName: "AboFranc4K Live",
    locale: "fr_FR",
    type: "website",
  },
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        {/* Google Ads Global Tag - Load First */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17718847114"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17718847114');
          `}
        </Script>

        <Providers>{children}</Providers>
        <ConditionalAnalytics />
      </body>
    </html>
  );
}
