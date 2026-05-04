import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import { AffiliateBanner } from "@/components/layout/affiliate-banner";
import { FeedbackCta } from "@/components/layout/feedback-cta";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-heading",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://open-love-sepia.vercel.app"),

  title: "OpenLove",
  description: "諱区・繝ｻ邨仙ｩ壹・諤ｧ縺ｫ髢｢縺吶ｋ繝ｪ繧｢繝ｫ繝・・繧ｿ繧貞・譛峨☆繧九・繝ｩ繝・ヨ繝輔か繝ｼ繝",

  openGraph: {
    title: "OpenLove",
    description: "諱区・繝ｻ邨仙ｩ壹・諤ｧ縺ｫ髢｢縺吶ｋ繝ｪ繧｢繝ｫ繝・・繧ｿ繧貞・譛峨☆繧九・繝ｩ繝・ヨ繝輔か繝ｼ繝",
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
    description: "諱区・繝ｻ邨仙ｩ壹・諤ｧ縺ｫ髢｢縺吶ｋ繝ｪ繧｢繝ｫ繝・・繧ｿ繧貞・譛峨☆繧九・繝ｩ繝・ヨ繝輔か繝ｼ繝",
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
      className={`${notoSansJp.variable} ${zenKakuGothicNew.variable} h-full antialiased`}
      style={
        {
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
