import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbars/Navbar";
import Footer from "@/components/shared/Footer";
import LiquidSideNav from "@/components/navbars/responsiveNavbar";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "GDGC RCCIIT",
  description: "Official Website of Google Developer Group On Campus, RCCIIT",
  icons: {
    icon: "./favicon/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      
      </head>
      <body
        className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="justify-center w-full sticky z-50 top-2 flex lg:hidden">
          <LiquidSideNav />
        </div>
        <div className="justify-center w-full sticky z-50 top-2 hidden lg:flex">
          <Navbar />
        </div>
        {children}
        <Footer />
        <ChatbotWidget />
        <Analytics />
        <script
          // Microsoft Clarity tracking
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){\n        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n        t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/tyancr4x62\";\n        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n    })(window, document, \"clarity\", \"script\", \"tyancr4x62\");`,
          }}
        />
      </body>
    </html>
  );
}
