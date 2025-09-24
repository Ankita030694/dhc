import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";
import Navbar from "../components/Navbar";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Delhi House Cafe Manchester - OpenTable Reservations",
  description: "Make a reservation at Delhi House Cafe Manchester through OpenTable. Restaurant ID #227751",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
               <link href="https://fonts.cdnfonts.com/css/merchant" rel="stylesheet" />
               <link href="https://fonts.cdnfonts.com/css/merchant-extra-light" rel="stylesheet" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${bodoniModa.variable} antialiased`}
      >
        <Navbar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
