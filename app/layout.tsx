import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { FloatingCart } from "@/components/cart/FloatingCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whiteline - Premium Minimal Clothing",
  description: "Premium minimal clothing for the modern lifestyle. Shop the latest collection.",
  openGraph: {
    title: "Whiteline - Premium Minimal Clothing",
    description: "Premium minimal clothing for the modern lifestyle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <FloatingCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
