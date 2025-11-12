import { client } from '@/lib/sanity.client'
import { allBlogsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/imageUrl'
import Link from 'next/link'

export default async function Home() {
  const blogs = await client.fetch(allBlogsQuery)

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
      <div className="grid gap-6">
        {blogs.map((blog: any) => (
          <Link key={blog._id} href={`/blogs/${blog.slug.current}`}>
            <div className="border p-4 rounded-lg hover:shadow-md transition">
              {blog.image && (
                <img
                  src={urlFor(blog.image).width(800).url()}
                  alt={blog.title}
                  className="rounded-lg mb-3"
                />
              )}
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(blog.publishedAt).toDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}