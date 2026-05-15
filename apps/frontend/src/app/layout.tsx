import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusOS | AI Freelancer CRM",
  description: "Enterprise-grade autonomous business operating system for freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground overflow-hidden h-screen flex`}>
        <Sidebar />
        <main className="flex-1 relative overflow-y-auto cinematic-gradient">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
