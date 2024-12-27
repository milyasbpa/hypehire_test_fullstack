import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import ReduxProvider from "@/core/module/app/redux/store/provider.app";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"], // Adjust subsets as needed
  weight: ["400", "500", "600", "700", "800"], // Specify weights you need
  display: "swap", // Optional: improves rendering performance
});

export const metadata: Metadata = {
  title: "Hypehire Frontend Test",
  description: "Hypehire Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
