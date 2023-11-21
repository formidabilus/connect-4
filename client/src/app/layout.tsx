import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/util/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect 4",
  description: "Connect 4 game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 `}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
