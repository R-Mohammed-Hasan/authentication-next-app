import { GeistSans } from "geist/font/sans";
import "./globals.css";
import "./reset.css";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { WrappedNavBar } from "./components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
// import { AuthProvider } from "./../context/auth-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Basic Authentication System",
  description: "This is a sample authentication system using Next.js",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthProvider>
    <html lang="en" className={GeistSans.className}>
      <body
        // Implement dark theme using this id
        id="doc-body"
        className={cn(
          "font-sans my-10 mx-14 antialiased bg-background text-foreground",
          fontSans.variable
        )}
      >
        <WrappedNavBar />
        <main className="flex flex-col items-center">{children}</main>
        <Toaster />
      </body>
    </html>
    // </AuthProvider>
  );
}
