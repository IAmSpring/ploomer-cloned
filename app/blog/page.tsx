"use client"

import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  title: string
  description: string
  author: string
  date: string
  readTime: string
  slug: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    title: "Deploy Vizro - With Custom Domain & Password Protection",
    description: "Learn how to deploy Vizro applications with custom domain configuration and secure password protection.",
    author: "Guillaume Thibault",
    date: "Dec 11, 2024",
    readTime: "6 Min read",
    slug: "deploy-vizro",
    image: "/images/blog/vizro-deploy.webp"
  },
  {
    title: "Shiny Apps with bslib: From Basics to Advanced Layouts",
    description: "A comprehensive guide to building Shiny applications using the bslib package for modern UI design.",
    author: "Guillaume Thibault",
    date: "Dec 04, 2024",
    readTime: "20 Min read",
    slug: "shiny-bslib",
    image: "/images/blog/shiny-bslib.webp"
  },
  {
    title: "Interactive Table in Streamlit with AgGrid",
    description: "A comprehensive guide to implementing interactive tables in Streamlit using the AgGrid component.",
    author: "Guillaume Thibault",
    date: "Nov 26, 2024",
    readTime: "17 Min read",
    slug: "streamlit-aggrid",
    image: "/images/blog/streamlit-table.webp"
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Header with Breadcrumb */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Blog</h1>
          <div className="flex justify-center items-center gap-2 text-sm">
            <Link href="/" className="text-[#FFD666] hover:text-[#FFC933]">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Blog</span>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
                <div className="relative h-52 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 group-hover:text-[#FFD666] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 text-sm line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 relative overflow-hidden">
                        <Image
                          src="/images/authors/guillaume.jpg"
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-gray-600">{post.author}</span>
                    </div>
                    <div className="text-gray-500">
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 