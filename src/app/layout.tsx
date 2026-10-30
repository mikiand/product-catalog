import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Product catalog",
  description: "A simple, searchable catalog of workspace essentials.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
