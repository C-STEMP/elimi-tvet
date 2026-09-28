import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elimi.africa"),
  title: {
    default: "ELIMI :: Nigeria's Unified TVET Platform",
    template: "%s | ELIMI",
  },
  description:
    "ELIMI is Nigeria's premier Technical and Vocational Education and Training (TVET) platform for skills training, National Skills Qualification (NSQ), Recognition of Prior Learning (RPL), and employment.",
  keywords: [
    "TVET Nigeria",
    "Technical and Vocational Education and Training",
    "National Skills Qualification",
    "NSQ",
    "Recognition of Prior Learning",
    "RPL Nigeria",
    "NABTEB Modular Certifications",
    "NBTE TVET",
    "Vocational Training Nigeria",
    "Skills Certification Nigeria",
    "Assessment Centre Nigeria",
    "Trade Skills Assessment",
    "Skilled Trades Certification",
  ],
  authors: [{ name: "ELIMI Africa", url: "https://cap.e-limi.africa" }],
  creator: "ELIMI Africa",
  publisher: "ELIMI Africa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "ELIMI — Nigeria's Unified TVET Platform",
    description:
      "Nigeria's nationwide TVET platform for getting trained, certified, and hired in the skilled trades, all in one place.",
    url: "https://cap.e-limi.africa",
    siteName: "ELIMI :: Nigeria's Unified TVET Platform",
    images: [
      {
        url: "/landing-img-1.jpg",
        width: 1200,
        height: 630,
        alt: "Preview image for ELIMI :: Nigeria's Unified TVET Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELIMI :: Nigeria's Unified TVET Platform",
    description:
      "Nigeria's nationwide TVET platform for getting trained, certified, and hired in the skilled trades, all in one place.",
    images: ["/landing-img-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${workSans.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
