import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function SubscribeToNewsletter() {
  return (
    <div className={`bg-black h-screen flex text-white ${inter.className}`}>
      Get top weekly picks by joining our newsletter
    </div>
  );
}
