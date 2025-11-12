import { client } from "@/lib/sanity.client";
import { singleBlogQuery } from "@/lib/queries";
import { urlFor } from "@/lib/imageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params; // ✅ Next.js 15 dynamic routes use async params now
  const blog = await client.fetch(singleBlogQuery, { slug });

  if (!blog) return <div>Not Found</div>;

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(blog.publishedAt).toDateString()}
      </p>

      {blog.image && (
        <Image
          width={800}
          height={800}
          src={urlFor(blog.image).width(1000).url()}
          alt={blog.title}
          className="rounded-xl mb-8"
        />
      )}

      <div className="prose max-w-none mb-10">
        <PortableText value={blog.body} />
      </div>

      {/* Rankings Section */}
      {blog.rankings && blog.rankings.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-4">Rankings</h2>
          <div className="space-y-8">
            {blog.rankings
              .sort((a: any, b: any) => a.rank - b.rank)
              .map((item: any) => (
                <div
                  key={item.rank}
                  className="border p-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    <a href={item.link}>
                      #{item.rank} — {item.title}
                    </a>
                  </h3>
                  {item.image && (
                    <Image
                      width={800}
                      height={800}
                      src={urlFor(item.image).width(800).url()}
                      alt={item.title}
                      className="rounded-md mb-3"
                    />
                  )}
                  <div className="prose">
                    <PortableText value={item.description} />
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </article>
  );
}