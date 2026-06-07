export type ProductType = {
  asin: string;
  category: string;
  overall_rating: number;
  title: string;
  highlights: string[];
  reviewCount: number;
  introduction: string;
  final_verdict: string;
  image: string;
  slug: string;
  price: string;
  features: [
    {
      name: string;
      rating: string;
      verdict: string;
    },
  ];
  specifications: [
    {
      name: string;
      value: string;
    },
  ];
};
