export type GeminiOutput = {
  title: string;
};

export type Product = {
  asin: string;
  title: string;
  avg_rating: number;
  gemini_output: GeminiOutput;
};