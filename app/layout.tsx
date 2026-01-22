import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/providers/theme-provider";
import { META_THEME_COLORS } from "@/lib/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansTagalog = localFont({
  src: "../public/fonts/NotoSansTagalog-Regular.ttf",
  variable: "--font-tagalog",
  display: "swap",
});

const siteUrl = "https://bryanpalay.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bryan Palay | Full Stack Developer & Software Engineer",
    template: "%s | Bryan Palay",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Explore my portfolio, projects, and professional experience.",
  keywords: [
    "Bryan Palay",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Bryan Palay", url: siteUrl }],
  creator: "Bryan Palay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bryan Palay",
    title: "Bryan Palay | Full Stack Developer & Software Engineer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Explore my portfolio, projects, and professional experience.",
    images: [
      {
        url: "/images/icon/bryanpalay.jpg",
        width: 1200,
        height: 630,
        alt: "Bryan Palay - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bryan Palay | Full Stack Developer & Software Engineer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/images/icon/bryanpalay.jpg"],
    creator: "@bryanpalay",
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
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/images/icon/bryanpalay.jpg",
    apple: "/images/icon/bryanpalay.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content={META_THEME_COLORS.light}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={META_THEME_COLORS.dark}
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansTagalog.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
