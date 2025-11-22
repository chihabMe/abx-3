import type React from "react";
import Script from "next/script";
import type { Metadata } from "next";
import ConditionalAnalytics from "@/components/ConditionalAnalytics";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abonix Frane - Plateforme de Divertissement Premium",
  description:
    "Abonix Frane - Service de streaming premium avec des milliers de contenus en 4K, support 24/7 et 99.9% de disponibilité",
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
