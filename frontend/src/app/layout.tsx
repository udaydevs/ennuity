import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100' , '200' , '400', '500', '600', '700'], // optional
})
export const metadata: Metadata = {
  title: "Ennuity",
  description: `Ennuity is an intelligent, AI-powered financial application designed to help users build, monitor, and optimize their retirement savings strategy. 
  Moving beyond traditional calculators, Ennuity leverages cutting-edge modeling to analyze market risks, simulate future scenarios, and deliver personalized, actionable financial advice.`
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
              <Toaster
          position="top-right"
          richColors
          theme="dark"
          closeButton
        />
    </html>
  )
}