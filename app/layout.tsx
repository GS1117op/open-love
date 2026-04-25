import type { Metadata } from "next";
import { AffiliateBanner } from "@/components/layout/affiliate-banner";
import { FeedbackCta } from "@/components/layout/feedback-cta";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://open-love-sepia.vercel.app"),

  title: "OpenLove",
  description: "恋愛・結婚・性に関するリアルデータを共有するプラットフォーム",

  openGraph: {
    title: "OpenLove",
    description: "恋愛・結婚・性に関するリアルデータを共有するプラットフォーム",
    url: "https://open-love-sepia.vercel.app/",
    siteName: "OpenLove",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenLove",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OpenLove",
    description: "恋愛・結婚・性に関するリアルデータを共有するプラットフォーム",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      style={
        {
          "--font-sans":
            '"Hiragino Sans", "Yu Gothic UI", "Yu Gothic", Meiryo, system-ui, sans-serif',
          "--font-geist-mono":
            '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <FeedbackCta />
        <AffiliateBanner />
      </body>
    </html>
  );
}