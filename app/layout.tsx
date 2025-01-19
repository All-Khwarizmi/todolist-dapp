"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/src/store/query-provider";
import {
  WalletProvider,
  WalletProviderContext,
} from "@/src/hooks/wallet/WalletProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <WalletProvider>{children}</WalletProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
