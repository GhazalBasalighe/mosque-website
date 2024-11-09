import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const parastoo = localFont({
  src: [
    {
      path: "../public/fonts/Parastoo.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Parastoo-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-parastoo",
});

export const metadata: Metadata = {
  title: "مسجد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <div>
        <Toaster />
      </div>

      <body className={`${parastoo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
