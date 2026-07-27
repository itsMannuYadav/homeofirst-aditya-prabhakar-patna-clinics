import { generateSEO } from "@/lib/seo";

/*
export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);

  return generateSEO({
    title: blog.title,
    description: blog.description,
    url: `/blogs/${blog.slug}`,
    keywords: blog.tags,
    image: blog.cover,
  });
}
*/
export default function BlogPage({ params }: { params: { slugs: string[] } }) {
  const slug = params.slugs.join("/");
  return (
    <div className="container-page">
      <h1>Blog Page: {slug}</h1>
    </div>
  );
}