import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
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
  src: "../components/fonts/NotoSansTagalog-Regular.ttf",
  variable: "--font-tagalog",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bryan Palay",
  description: "Portfolio Website",
  icons: {
    icon: "/images/bryanpalay.jpg",
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
