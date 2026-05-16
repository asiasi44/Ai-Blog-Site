import { RiArrowGoBackFill } from "react-icons/ri";
import { Inter } from "next/font/google";
import AddEmail from "./addEmail";
import { parseUtmCampaign, parseUtmSource } from "./utm";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function SubscribeToNewsletter({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const source = parseUtmSource(params.utm_source);
  const campaign = parseUtmCampaign(params.utm_campaign);

  return (
    <div
      className={`bg-black h-screen flex flex-col gap-16 text-white ${inter.className} items-center justify-center`}
    >
      <Link
        href={"/"}
        className="absolute top-12 left-12 text-2xl flex items-center gap-2 hover:border-b hover:border-yellow-300 cursor-pointer"
      >
        <div>
          <RiArrowGoBackFill />
        </div>
        <div>Go Back</div>
      </Link>
      <div className="text-5xl">
        Get top weekly picks by joining our newsletter
      </div>
      <div className="w-full items-center flex flex-col gap-8">
        <AddEmail source={source} campaign={campaign} />
        <div className="">Unsubscribe Anytime, Instantly</div>
      </div>
    </div>
  );
}
