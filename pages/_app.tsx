import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const fivo = localFont({
  src: [
    {
      path: "../public/fonts/fivosansmodern-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/fivosansmodern-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-fivo",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${fivo.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
