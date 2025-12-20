export type GeminiOutput = {
  title: string;
};

export type ProductType = {
  asin: string;
  overall_rating: number;
  title: string;
  highlights: string[];
  reviewCount: number;
  category: string;
  introduction: string;
  final_verdict: string;
  image: string;
  slug: string;
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
