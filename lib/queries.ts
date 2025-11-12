import { groq } from 'next-sanity'

export const allBlogsQuery = groq`
*[_type == "blog"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  rankings[]{
    rank,
    title,
    description,
    image
  }
}
`

export const singleBlogQuery = groq`
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  publishedAt,
  image,
  body,
  rankings[]{
    link,
    rank,
    title,
    description,
    image
  }
}
`