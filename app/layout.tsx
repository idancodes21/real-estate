import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manRope = Manrope({
  variable: '--font-manrope',
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Yariga Real Estate",
  description: "Real Estate Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manRope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
