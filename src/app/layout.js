import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata = {
  title: { default: `${SITE_NAME} | Community service events`, template: `%s | ${SITE_NAME}` },
  description: `${SITE_TAGLINE} Create, find and join community service events near you.`,
};

// Sets the saved theme before the page paints, so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'sebadark':'seba'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','seba')}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="seba" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
