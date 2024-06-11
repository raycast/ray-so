import { Inter } from "next/font/google";
import "./globals.css";
import cn from "classnames";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const metadata = {
  metadataBase: new URL(url),
  title: "Ray.so",
  description: "Ray.so",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("isolate", inter.className)}>{children}</body>
    </html>
  );
}
