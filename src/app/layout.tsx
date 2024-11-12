import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduIfa | AI-Powered Educational Platform for African Students",
  description:
    "EduIfa is an innovative AI-powered educational platform supporting students from primary school to university across Africa. Personalized learning, AI tutors, and comprehensive academic support.",
  keywords:
    "EduIfa, AI education, African students, personalized learning, online tutoring",
  authors: [{ name: "Olajide Abdul Qahar Dolapo" }],
  openGraph: {
    title: "EduIfa - Revolutionizing Education in Africa",
    description:
      "AI-powered personalized learning for students across Africa. Join EduIfa for an innovative educational experience.",
    url: "https://www.eduifa.site/",
    siteName: "EduIfa",
    images: [
      {
        url: "https://www.eduifa.site/pLogo.png",
        width: 1200,
        height: 630,
        alt: "EduIfa Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduIfa - AI-Powered Education for African Students",
    description:
      "Personalized learning, AI tutors, and academic support for students across Africa.",
    images: ["https://www.eduifa.site/pLogo.png"],
  },
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
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomProvider>{children}</CustomProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
