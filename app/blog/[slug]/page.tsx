"use client"

import { BlogPost } from "@/app/components/blog-post"
import { TableOfContents } from "@/app/components/table-of-contents"

interface Section {
  id: string
  title: string
  level: number
}

// This would come from your CMS/data source
const post = {
  title: "Deploy Vizro - With Custom Domain & Password Protection",
  author: "Guillaume Thibault",
  date: "Dec 11, 2024",
  readTime: "6 Min read",
  image: "/images/blog/vizro-deploy.webp",
  content: `
    You're ready to share your dashboard with Vizro it with your team? Perfect timing! In this guide, I'll walk you through deploying a Vizro application with enterprise-grade features like custom domain support and password protection. Don't worry - it's easier than you might think.

    ## What We'll Cover

    - Setting up a production-ready Vizro application
    - Containerizing your dashboard with Docker
    - Deploying to Ploomber Cloud
    - Configuring custom domain access
    - Adding password protection for security

    ## Project Structure

    When deploying a Vizro application, you'll need two essential files with specific names:

    \`\`\`bash
    my-vizro-app/
    ├── ...                # All other files and folders
    ├── app.py            # To start your main application
    └── requirements.txt  # Python dependencies
    \`\`\`

    Any additional Python files your dashboard needs can be organized in the same directory.

    ## Setting Up Your Application

    ### 1. The Main Application (app.py)

    If you've been developing with Vizro, you might have noticed a warning when running \`python app.py\` about static files being served in development mode. That's because we need to configure the application for production use.
  `,
  sections: [
    { id: "what-well-cover", title: "What We'll Cover", level: 2 },
    { id: "project-structure", title: "Project Structure", level: 2 },
    { id: "setting-up-your-application", title: "Setting Up Your Application", level: 2 },
    { id: "the-main-application", title: "1. The Main Application (app.py)", level: 3 },
  ]
}

export default function BlogPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-semibold mb-4">Table of Contents</h3>
            <TableOfContents sections={post.sections} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl">
          <BlogPost
            title={post.title}
            content={post.content}
            author={post.author}
            date={post.date}
            readTime={post.readTime}
            image={post.image}
          />
        </div>
      </div>
    </div>
  )
} 