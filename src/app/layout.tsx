import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/modules/common/providers/StoreProvider";
import { QueryProvider } from "@/modules/common/providers/QueryProvider";
import { Header } from "@/modules/common/components/Header";
import { Toaster } from "@/modules/common/components/ui/toaster";
import Status from "@/modules/common/components/Status";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Avail Explorer",
  description: "A simple explorer for Avail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          <StoreProvider>
            <Header />
            <main className="container mx-auto py-8">{children}</main>
            <Status />
            <Toaster />
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
