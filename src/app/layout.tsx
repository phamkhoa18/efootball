import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SITE_URL = "https://efootball.vn";
const SITE_NAME = "eFootball™ Vietnam";
const SITE_DESC =
  "eFootball™ Vietnam — Cộng đồng eFootball™ chính thức tại Việt Nam. Tin tức, giải đấu, bảng xếp hạng và tải game miễn phí từ KONAMI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "eFootball™ Vietnam | Trang Chủ Chính Thức",
    template: "%s | eFootball™ Vietnam",
  },
  description: SITE_DESC,
  keywords: [
    "eFootball", "eFootball Vietnam", "eFootball VN", "game bóng đá",
    "KONAMI", "PES", "Dream Team", "eSports", "bóng đá điện tử",
    "giải đấu eFootball", "bảng xếp hạng eFootball", "tải eFootball",
    "eFootball mobile", "eFootball PC", "eFootball PS5",
  ],
  authors: [{ name: "eFootball Vietnam", url: SITE_URL }],
  creator: "eFootball Vietnam",
  publisher: "KONAMI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "eFootball™ Vietnam | Trang Chủ Chính Thức",
    description: SITE_DESC,
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "eFootball™ Vietnam — Game bóng đá miễn phí hàng đầu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eFootball™ Vietnam | Trang Chủ Chính Thức",
    description: SITE_DESC,
    images: ["/assets/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "gaming",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a14c8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESC,
    publisher: {
      "@type": "Organization",
      name: "eFootball Vietnam",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.svg`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/bxh?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="vi">
      <head>
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
