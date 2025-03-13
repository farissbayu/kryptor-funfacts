import { Shantell_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const shantelSans = Shantell_Sans({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Funfacts",
  description: "Facts for your favorite interest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${shantelSans.variable}  antialiased bg-orange-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
