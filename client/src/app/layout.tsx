import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "@/context/SocketContext";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "A modern restaurant ordering system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
