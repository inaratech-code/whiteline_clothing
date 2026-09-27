import type { Metadata, Viewport } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCart } from "@/components/cart/FloatingCart";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a205c",
};

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
    <html lang="en" className="overflow-x-hidden" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dawning+of+a+New+Day&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dancingScript.variable} antialiased overflow-x-hidden min-w-0 font-whiteline`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <ConditionalLayout header={<Header />} footer={<Footer />}>
              {children}
            </ConditionalLayout>
            <FloatingCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
