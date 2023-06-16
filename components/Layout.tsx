import React from "react";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex min-h-[100vh] justify-center">
        <div className="w-full max-w-[90%]">{children}</div>
      </main>
      <div className="flex justify-center">
        <div className="w-full max-w-[90%]">
          <Footer />
        </div>
      </div>
    </>
  );
};
