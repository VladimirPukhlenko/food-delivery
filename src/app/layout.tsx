import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import AuthProvider from "@/components/AuthProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Trattoria",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <ReactQueryProvider>
            <Notification />
            <Navbar />
            {children}
            <Toaster position="top-left" />
            <Footer />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
