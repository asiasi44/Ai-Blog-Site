import BestPicksArticlePage from "../BestPicksArticlePage";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: "best-soundbar-for-home-theater" }];
}

export default async function BestPicksSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  return <BestPicksArticlePage />;
}
