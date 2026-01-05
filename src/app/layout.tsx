import type { Metadata, Viewport } from "next";
import { Noto_Sans_Arabic, Manrope } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/components/PWARegister";
import { SessionProvider } from "@/components/SessionProvider";
import { QuizProvider } from "@/contexts/QuizContext";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-arabic",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Ask Seba - عطرك المثالي",
    template: "%s | Ask Seba",
  },
  description: "اكتشف عطرك المثالي في 3 دقائق",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/pwa-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    title: "Ask Seba",
    statusBarStyle: "default",
    capable: true,
    startupImage: [
      {
        url: "/pwa-192.png",
        media: "(device-width: 375px) and (device-height: 667px)",
      },
      {
        url: "/pwa-512.png",
        media: "(device-width: 414px) and (device-height: 896px)",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  openGraph: {
    title: "Ask Seba - عطرك المثالي",
    description: "اكتشف عطرك المثالي في 3 دقائق",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Seba - عطرك المثالي",
    description: "اكتشف عطرك المثالي في 3 دقائق",
  },
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#c0841a",
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoSansArabic.variable} ${manrope.variable}`}>
      <body
        className={`${notoSansArabic.className} antialiased`}
      >
        <SessionProvider>
          <QuizProvider>
            {children}
            <PWARegister />
          </QuizProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
