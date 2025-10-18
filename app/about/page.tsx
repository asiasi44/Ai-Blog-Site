export const metadata = {
  title: "About | Product Reviews",
  description: "Learn more about our mission and the story behind Product Reviews.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to <span className="font-semibold">Product Reviews</span> — a platform built to make online shopping smarter and more transparent.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We analyze hundreds of reviews from real customers using advanced AI models to summarize sentiments, extract emotions, and rank products by trustworthiness. Our goal is simple — to help you make confident purchase decisions without wasting time on fake or biased reviews.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          This project is independently built with love for technology, design, and transparency. We’re constantly improving, so stay tuned for new features and smarter insights.
        </p>
      </div>
    </div>
  );
}