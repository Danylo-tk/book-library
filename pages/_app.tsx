import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${fivo.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </QueryClientProvider>
  );
}
