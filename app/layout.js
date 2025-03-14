import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import { TokenProvider } from "./context/tokenContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BiblioFino",
  description: "Líderes innovadores en marketing digital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TokenProvider>
          <UserProvider>

            {children}

          </UserProvider>
        </TokenProvider>
      </body>
    </html>
  );
}

