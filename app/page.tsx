import { getCategoriesToShow } from "@/lib/fetches/categoriesToShow";
import NewHomePageClient from "./newHomepage/NewHomePageClient";

export const revalidate = 60;

export default async function NewHomePage() {
  const categories = await getCategoriesToShow();

  return <NewHomePageClient categories={categories} />;
}
