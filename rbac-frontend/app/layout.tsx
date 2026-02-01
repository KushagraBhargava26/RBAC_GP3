import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RBAC Chatbot",
  description: "Secure Enterprise RAG System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Implement root layout
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
