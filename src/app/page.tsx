"use client";

import EthLogin from "@/src/components/EthLogin";
import Footer from "@/src/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col max-w-md px-4 h-screen">
        <div className="flex-grow flex items-center justify-center">
          <EthLogin />
        </div>
        <Footer />
      </div>
    </main>
  );
}
