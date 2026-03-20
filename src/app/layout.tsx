import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProSet Site Builder",
  description: "Generate professional websites for local service businesses in under 2 minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
