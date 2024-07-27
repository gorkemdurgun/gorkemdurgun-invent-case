"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </body>
    </html>
  );
}
